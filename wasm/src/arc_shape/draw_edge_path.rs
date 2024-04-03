use crate::util::{
    constant::ArcShape,
    draw_arcs,
    formula::{get_circular_arc_locus, CircularArcLayer},
    get_large_arc_flag, path_command, radians_to_degree,
};

#[allow(non_snake_case)]
pub fn draw_edge_path(
    radius: f64,
    width: f64,
    margin: f64,
    morphing_shape: bool,
    shape: ArcShape,
    starting_degree: f64,
    end_degree: f64,
) -> String {
    let large_arc_flag = get_large_arc_flag(end_degree - starting_degree, morphing_shape);
    let gap = radians_to_degree(width / 2.0 / radius);

    let (arc1, arc2) = match shape {
        ArcShape::Edge => {
            let arc1 = (starting_degree, end_degree - gap);
            let arc2 = (end_degree, starting_degree + gap);

            (arc1, arc2)
        }
        ArcShape::ReverseEdge => {
            let arc1 = (starting_degree + gap, end_degree);
            let arc2 = (end_degree - gap, starting_degree);

            (arc1, arc2)
        }
        ArcShape::DoubleEdge => {
            let arc1 = (starting_degree + gap, end_degree - gap);
            let arc2 = (end_degree, starting_degree);

            (arc1, arc2)
        }
        ArcShape::ReverseDoubleEdge => {
            let arc1 = (starting_degree, end_degree);
            let arc2 = (end_degree - gap, starting_degree + gap);

            (arc1, arc2)
        }
        _ => panic!("Shape not allowed"),
    };

    let arc1 = get_circular_arc_locus(
        CircularArcLayer::L1,
        radius,
        width,
        margin,
        morphing_shape,
        arc1.0,
        arc1.1,
    );
    let arc1_start = arc1[0];
    let arc1_end = arc1[arc1.len() - 1];

    let arc2 = get_circular_arc_locus(
        CircularArcLayer::L3,
        radius,
        width,
        margin,
        morphing_shape,
        arc2.0,
        arc2.1,
    );
    let arc2_start = arc2[0];
    let arc2_end = arc2[arc2.len() - 1];

    /*
        Draw path pattern:
        without morph   : M -> A1 -> L  ->       A2 -> Z
        with morph      : M -> A1 -> C1 -> C2 -> A2 -> C3 -> C4
    */
    let M = path_command::MoveTo::M(arc1_start.point.x, arc1_start.point.y);
    let A1 = draw_arcs(morphing_shape, large_arc_flag, 0, &arc1[1..]);
    let A2 = draw_arcs(morphing_shape, large_arc_flag, 1, &arc2[1..]);

    if morphing_shape {
        let LC1 = path_command::CubicBezierCurve::C(
            arc1_end.point.x,
            arc1_end.point.y,
            arc1_end.point.x,
            arc1_end.point.y,
            arc1_end.point.x,
            arc1_end.point.y,
        );

        let C2 = path_command::CubicBezierCurve::C(
            arc1_end.point.x,
            arc1_end.point.y,
            arc2_start.point.x,
            arc2_start.point.y,
            arc2_start.point.x,
            arc2_start.point.y,
        );

        let ZC3 = path_command::CubicBezierCurve::C(
            arc2_end.point.x,
            arc2_end.point.y,
            arc2_end.point.x,
            arc2_end.point.y,
            arc2_end.point.x,
            arc2_end.point.y,
        );

        let C4 = path_command::CubicBezierCurve::C(
            arc2_end.point.x,
            arc2_end.point.y,
            arc1_start.point.x,
            arc1_start.point.y,
            arc1_start.point.x,
            arc1_start.point.y,
        );

        format!("{M} {A1} {LC1} {C2} {A2} {ZC3} {C4}")
    } else {
        let LC1 = path_command::LineTo::L(arc2_start.point.x, arc2_start.point.y);
        let ZC3 = path_command::CLOSE_PATH;

        format!("{M} {A1} {LC1} {A2} {ZC3}")
    }
}
