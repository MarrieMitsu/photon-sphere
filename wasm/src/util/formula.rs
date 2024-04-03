use super::{constant::ANGLE_DIVISION, degree_to_radians, fixed_decimal};

#[derive(Copy, Clone)]
pub struct PolarCoordinate {
    pub x: f64,
    pub y: f64,
}

fn get_polar_coordinate(radius: f64, degree: f64) -> PolarCoordinate {
    let x = radius * degree_to_radians(degree).cos();
    let y = radius * degree_to_radians(degree).sin();

    PolarCoordinate { x, y }
}

#[derive(Copy, Clone)]
pub struct LocusPoint {
    pub radius: f64,
    pub point: PolarCoordinate,
}

#[derive(Copy, Clone)]
pub enum CircularArcLayer {
    L1,
    L2,
    L3,
}

pub fn get_circular_arc_locus(
    layer: CircularArcLayer,
    radius: f64,
    width: f64,
    margin: f64,
    morphing_shape: bool,
    starting_degree: f64,
    end_degree: f64,
) -> Vec<LocusPoint> {
    let fixed_radius = radius - margin;
    let mut locus: Vec<LocusPoint> = Vec::new();

    let arc_radius: f64 = match layer {
        CircularArcLayer::L1 => fixed_radius,
        CircularArcLayer::L2 => fixed_radius - (width / 2.0),
        CircularArcLayer::L3 => fixed_radius - width,
    };

    if morphing_shape {
        let (fixed_starting_degree, fixed_end_degree) = if end_degree > starting_degree {
            (starting_degree, end_degree)
        } else {
            (end_degree, starting_degree)
        };

        let degree_range = fixed_end_degree - fixed_starting_degree;
        let division = (degree_range / ANGLE_DIVISION).ceil() as usize;

        let mut i = 0;
        while i <= division {
            let mut degree = fixed_starting_degree + (ANGLE_DIVISION * i as f64);

            if degree >= fixed_end_degree {
                degree = fixed_end_degree;
            }

            let mut point = get_polar_coordinate(arc_radius, degree);

            point.x = fixed_decimal(radius + point.x);
            point.y = fixed_decimal(radius - point.y);

            locus.push(LocusPoint {
                radius: arc_radius,
                point: point,
            });

            i += 1;
        }

        if end_degree < starting_degree {
            locus.reverse();
        }
    } else {
        let mut starting_point = get_polar_coordinate(arc_radius, starting_degree);
        let mut endpoint = get_polar_coordinate(arc_radius, end_degree);

        starting_point.x = fixed_decimal(radius + starting_point.x);
        starting_point.y = fixed_decimal(radius - starting_point.y);
        endpoint.x = fixed_decimal(radius + endpoint.x);
        endpoint.y = fixed_decimal(radius - endpoint.y);

        locus.extend(vec![
            LocusPoint {
                radius: arc_radius,
                point: starting_point,
            },
            LocusPoint {
                radius: arc_radius,
                point: endpoint,
            },
        ]);
    }

    locus
}

#[derive(Copy, Clone)]
pub enum SpiralArcLayer {
    L1,
    L3,
}

#[derive(Copy, Clone)]
pub enum Behavior {
    Grow,
    Shrink,
}

pub fn get_spiral_arc_locus(
    layer: SpiralArcLayer,
    radius: f64,
    width: f64,
    margin: f64,
    behavior: Behavior,
    starting_degree: f64,
    end_degree: f64,
) -> Vec<LocusPoint> {
    let fixed_radius = radius - margin;

    let (fixed_starting_degree, fixed_end_degree) = if end_degree > starting_degree {
        (starting_degree, end_degree)
    } else {
        (end_degree, starting_degree)
    };

    let degree_range = fixed_end_degree - fixed_starting_degree;
    let division = (degree_range / ANGLE_DIVISION).ceil() as usize;
    let sub_layer_distance = width / 2.0 / division as f64;
    let median = fixed_radius - (width / 2.0);
    let mut locus: Vec<LocusPoint> = Vec::new();

    let mut i = 0;
    while i <= division {
        let mut degree = fixed_starting_degree + (ANGLE_DIVISION * i as f64);
        if degree >= fixed_end_degree {
            degree = fixed_end_degree;
        }

        let (arc_radius, mut point) = match layer {
            SpiralArcLayer::L1 => {
                let arc_radius = match behavior {
                    Behavior::Grow => median + (sub_layer_distance * i as f64),
                    Behavior::Shrink => fixed_radius - (sub_layer_distance * i as f64),
                };
                let point = get_polar_coordinate(arc_radius, degree);

                (arc_radius, point)
            }
            SpiralArcLayer::L3 => {
                let arc_radius = match behavior {
                    Behavior::Grow => median - (sub_layer_distance * i as f64),
                    Behavior::Shrink => fixed_radius + (sub_layer_distance * i as f64),
                };
                let point = get_polar_coordinate(arc_radius, degree);

                (arc_radius, point)
            }
        };

        point.x = fixed_decimal(radius + point.x);
        point.y = fixed_decimal(radius - point.y);

        locus.push(LocusPoint {
            radius: arc_radius,
            point: point,
        });

        i += 1;
    }

    if end_degree < starting_degree {
        locus.reverse();
    }

    locus
}
