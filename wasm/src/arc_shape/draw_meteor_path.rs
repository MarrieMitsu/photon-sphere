use crate::util::{
    constant::ArcShape,
    draw_arcs,
    formula::{
        get_circular_arc_locus, get_spiral_arc_locus, Behavior, CircularArcLayer, SpiralArcLayer,
    },
    path_command, radians_to_degree,
};

#[allow(non_snake_case)]
pub fn draw_meteor_path(
    radius: f64,
    width: f64,
    margin: f64,
    morphing_shape: bool,
    shape: ArcShape,
    starting_degree: f64,
    end_degree: f64,
) -> String {
    let gap = radians_to_degree(width / radius);

    let (behavior, arc1_degree, arc2_degree) = match shape {
        ArcShape::Meteor => {
            let arc1 = (starting_degree, end_degree - gap);
            let arc2 = (end_degree - gap, starting_degree);

            (Behavior::Grow, arc1, arc2)
        }
        ArcShape::ReverseMeteor => {
            let arc1 = (starting_degree + gap, end_degree);
            let arc2 = (end_degree, starting_degree + gap);

            (Behavior::Shrink, arc1, arc2)
        }
        _ => panic!("Shape not allowed"),
    };

    let arc1 = get_spiral_arc_locus(
        SpiralArcLayer::L1,
        radius,
        width,
        margin,
        behavior,
        arc1_degree.0,
        arc1_degree.1,
    );
    let arc1_start = arc1[0];
    let arc1_end = arc1[arc1.len() - 1];

    let arc2 = get_spiral_arc_locus(
        SpiralArcLayer::L3,
        radius,
        width,
        margin,
        behavior,
        arc2_degree.0,
        arc2_degree.1,
    );
    let arc2_start = arc2[0];
    let arc2_end = arc2[arc2.len() - 1];

    let arc3 = get_circular_arc_locus(
        CircularArcLayer::L2,
        radius,
        width,
        margin,
        morphing_shape,
        starting_degree,
        end_degree,
    );
    let arc3_start = arc3[0];
    let arc3_end = arc3[arc3.len() - 1];

    /*
        Draw path pattern:
        without morph           : M -> A1 -> C1 -> C2 -> A2
        without morph (reverse) : M -> A2             -> A2 -> C3 -> C4
        with morph              : M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    let M = path_command::MoveTo::M(arc1_start.point.x, arc1_start.point.y);
    let A1 = draw_arcs(morphing_shape, 0, 0, &arc1[1..]);
    let A2 = draw_arcs(morphing_shape, 0, 1, &arc2[1..]);

    if morphing_shape {
        let (C1, C2, C3, C4) = match shape {
            ArcShape::Meteor => {
                let C1 = path_command::CubicBezierCurve::c(
                    arc1_end.point.x,
                    arc1_end.point.y,
                    arc3_end.point.x,
                    arc3_end.point.y,
                    arc3_end.point.x,
                    arc3_end.point.y,
                );

                let C2 = path_command::CubicBezierCurve::c(
                    arc3_end.point.x,
                    arc3_end.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                );

                let C3 = path_command::CubicBezierCurve::c(
                    arc2_end.point.x,
                    arc2_end.point.y,
                    arc2_end.point.x,
                    arc2_end.point.y,
                    arc2_end.point.x,
                    arc2_end.point.y,
                );

                let C4 = path_command::CubicBezierCurve::c(
                    arc2_end.point.x,
                    arc2_end.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                );

                (C1, C2, C3, C4)
            }
            ArcShape::ReverseMeteor => {
                let C1 = path_command::CubicBezierCurve::c(
                    arc1_end.point.x,
                    arc1_end.point.y,
                    arc1_end.point.x,
                    arc1_end.point.y,
                    arc1_end.point.x,
                    arc1_end.point.y,
                );

                let C2 = path_command::CubicBezierCurve::c(
                    arc1_end.point.x,
                    arc1_end.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                );

                let C3 = path_command::CubicBezierCurve::c(
                    arc2_end.point.x,
                    arc2_end.point.y,
                    arc3_start.point.x,
                    arc3_start.point.y,
                    arc3_start.point.x,
                    arc3_start.point.y,
                );

                let C4 = path_command::CubicBezierCurve::c(
                    arc3_start.point.x,
                    arc3_start.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                );

                (C1, C2, C3, C4)
            }
            _ => panic!("Shape not allowed"),
        };

        format!("{M} {A1} {C1} {C2} {A2} {C3} {C4}")
    } else {
        match shape {
            ArcShape::Meteor => {
                let C1 = path_command::CubicBezierCurve::c(
                    arc1_end.point.x,
                    arc1_end.point.y,
                    arc3_end.point.x,
                    arc3_end.point.y,
                    arc3_end.point.x,
                    arc3_end.point.y,
                );

                let C2 = path_command::CubicBezierCurve::c(
                    arc3_end.point.x,
                    arc3_end.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                    arc2_start.point.x,
                    arc2_start.point.y,
                );

                format!("{M} {A1} {C1} {C2} {A2}")
            }
            ArcShape::ReverseMeteor => {
                let C3 = path_command::CubicBezierCurve::c(
                    arc2_end.point.x,
                    arc2_end.point.y,
                    arc3_start.point.x,
                    arc3_start.point.y,
                    arc3_start.point.x,
                    arc3_start.point.y,
                );

                let C4 = path_command::CubicBezierCurve::c(
                    arc3_start.point.x,
                    arc3_start.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                    arc1_start.point.x,
                    arc1_start.point.y,
                );

                format!("{M} {A1} {A2} {C3} {C4}")
            }
            _ => panic!("Shape not allowed"),
        }
    }
}
