use crate::util::{
    draw_arcs,
    formula::{get_circular_arc_locus, CircularArcLayer},
    get_large_arc_flag, path_command, radians_to_degree,
};

#[allow(non_snake_case)]
pub fn draw_bevelled_edge_path(
    radius: f64,
    width: f64,
    margin: f64,
    morphing_shape: bool,
    starting_degree: f64,
    end_degree: f64,
) -> String {
    let large_arc_flag = get_large_arc_flag(end_degree - starting_degree, morphing_shape);
    let gap = radians_to_degree(width / radius);

    let arc1 = get_circular_arc_locus(
        CircularArcLayer::L1,
        radius,
        width,
        margin,
        morphing_shape,
        starting_degree + gap,
        end_degree - gap,
    );
    let arc1_start = arc1[0];
    let arc1_end = arc1[arc1.len() - 1];

    let arc2 = get_circular_arc_locus(
        CircularArcLayer::L3,
        radius,
        width,
        margin,
        morphing_shape,
        end_degree - gap,
        starting_degree + gap,
    );
    let arc2_start = arc2[0];
    let arc2_end = arc2[arc2.len() - 1];

    let arc3 = get_circular_arc_locus(
        CircularArcLayer::L2,
        radius,
        width,
        margin,
        morphing_shape,
        end_degree,
        starting_degree,
    );
    let arc3_start = arc3[0];
    let arc3_end = arc3[arc3.len() - 1];

    /*
        Draw path pattern:
        M -> A1 -> C1 -> C2 -> A2 -> C3 -> C3
    */
    let M = path_command::MoveTo::M(arc1_start.point.x, arc1_start.point.y);

    let A1 = draw_arcs(morphing_shape, large_arc_flag, 0, &arc1[1..]);

    let C1 = path_command::CubicBezierCurve::C(
        arc1_end.point.x,
        arc1_end.point.y,
        arc3_start.point.x,
        arc3_start.point.y,
        arc3_start.point.x,
        arc3_start.point.y,
    );

    let C2 = path_command::CubicBezierCurve::C(
        arc3_start.point.x,
        arc3_start.point.y,
        arc2_start.point.x,
        arc2_start.point.y,
        arc2_start.point.x,
        arc2_start.point.y,
    );

    let A2 = draw_arcs(morphing_shape, large_arc_flag, 1, &arc2[1..]);

    let C3 = path_command::CubicBezierCurve::C(
        arc2_end.point.x,
        arc2_end.point.y,
        arc3_end.point.x,
        arc3_end.point.y,
        arc3_end.point.x,
        arc3_end.point.y,
    );

    let C4 = path_command::CubicBezierCurve::C(
        arc3_end.point.x,
        arc3_end.point.y,
        arc1_start.point.x,
        arc1_start.point.y,
        arc1_start.point.x,
        arc1_start.point.y,
    );

    format!("{M} {A1} {C1} {C2} {A2} {C3} {C4}")
}
