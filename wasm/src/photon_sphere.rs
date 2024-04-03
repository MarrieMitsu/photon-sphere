use wasm_bindgen::prelude::*;

use crate::{
    arc_shape::{
        draw_bevelled_edge_path, draw_comet_bevelled_tail_path, draw_comet_path,
        draw_comet_tail_path, draw_edge_path, draw_meteor_path, draw_rounded_path,
        draw_uniform_path,
    },
    util::{
        calc_margin,
        constant::{Alignment, ArcShape, ALT_ANGLE, ANGLE},
        fixed_degree, largest_number_in_vec,
    },
};

pub enum Widths<'a> {
    Single(f64),
    Batch(&'a [f64]),
}

pub enum Shapes<'a> {
    Single(ArcShape),
    Batch(&'a [ArcShape]),
}

/// PhotonSphere
pub struct PhotonSphere;

#[wasm_bindgen]
impl PhotonSphere {
    pub fn new<'a>(
        radius: f64,
        widths: Widths<'a>,
        shapes: Shapes<'a>,
        offset: Option<f64>,
        arc_dasharray: &'a [f64],
        align: Alignment,
        morphing_shape: bool,
        callback: &js_sys::Function,
    ) {
        let mut arcs: Vec<ArcPath> = Vec::new();
        let mut threshold = 0.0;
        let mut i = 0;
        let mut j = 0;

        let mut width: f64;
        let largest_width: f64;
        match widths {
            Widths::Batch(val) if val.len() > 0 => {
                width = val[0];
                largest_width = largest_number_in_vec(val);
            }
            Widths::Batch(_) => return arcs,
            Widths::Single(val) => {
                width = val;
                largest_width = val;
            }
        };

        let mut shape: ArcShape;
        match shapes {
            Shapes::Batch(val) if val.len() > 0 => {
                shape = val[0];
            }
            Shapes::Batch(_) => return arcs,
            Shapes::Single(val) => {
                shape = val;
            }
        };

        threshold += match offset {
            Some(val) => val,
            _ => 0.0,
        };

        if arc_dasharray.len() > 0 {
            // prevent infinite loop causing by zero as initial value
            if fixed_degree(arc_dasharray[0]) == 0.0 {
                return arcs;
            }

            while threshold < ANGLE {
                let is_odd = (i + 1) % 2 != 0;

                let mut degree = fixed_degree(arc_dasharray[i % arc_dasharray.len()]);
                if degree > (ANGLE - threshold) {
                    degree = ANGLE - threshold;
                }

                if let Widths::Batch(val) = widths {
                    width = val[j % val.len()];
                }

                if let Shapes::Batch(val) = shapes {
                    shape = val[j % val.len()];
                }

                if is_odd {
                    let margin = calc_margin(width, largest_width, align);

                    let path = match shape {
                        ArcShape::Uniform => draw_uniform_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::Rounded => draw_rounded_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::Edge
                        | ArcShape::ReverseEdge
                        | ArcShape::DoubleEdge
                        | ArcShape::ReverseDoubleEdge => draw_edge_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::BevelledEdge => draw_bevelled_edge_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::UniformIontail | ArcShape::UniformAntitail => {
                            draw_comet_tail_path(
                                radius,
                                width,
                                margin,
                                morphing_shape,
                                shape,
                                threshold,
                                threshold + degree,
                            )
                        }
                        ArcShape::TopBevelledIontail
                        | ArcShape::TopBevelledAntitail
                        | ArcShape::BottomBevelledIontail
                        | ArcShape::BottomBevelledAntitail => draw_comet_bevelled_tail_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::Comet | ArcShape::ReverseComet => draw_comet_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            shape,
                            threshold,
                            threshold + degree,
                        ),
                        ArcShape::Meteor | ArcShape::ReverseMeteor => draw_meteor_path(
                            radius,
                            width,
                            margin,
                            morphing_shape,
                            shape,
                            threshold,
                            threshold + degree,
                        ),
                    };

                    // js closure
                    callback.call3(
                        &JsValue::NULL, 
                        &JsValue::from_str(&path), 
                        &JsValue::TRUE, 
                        &JsValue::from_f64(j),
                    );

                    j += 1;
                }

                threshold += degree;
                i += 1;
            }
        } else {
            let path = match shape {
                ArcShape::Uniform => {
                    draw_uniform_path(radius, width, 0.0, morphing_shape, 0.0, ALT_ANGLE)
                }
                ArcShape::Rounded => {
                    draw_rounded_path(radius, width, 0.0, morphing_shape, 0.0, ALT_ANGLE)
                }
                ArcShape::Edge
                | ArcShape::DoubleEdge
                | ArcShape::ReverseEdge
                | ArcShape::ReverseDoubleEdge => {
                    draw_edge_path(radius, width, 0.0, morphing_shape, shape, 0.0, ALT_ANGLE)
                }
                ArcShape::BevelledEdge => {
                    draw_bevelled_edge_path(radius, width, 0.0, morphing_shape, 0.0, ALT_ANGLE)
                }
                ArcShape::UniformIontail | ArcShape::UniformAntitail => {
                    draw_comet_tail_path(radius, width, 0.0, morphing_shape, shape, 0.0, ALT_ANGLE)
                }
                ArcShape::TopBevelledIontail
                | ArcShape::TopBevelledAntitail
                | ArcShape::BottomBevelledIontail
                | ArcShape::BottomBevelledAntitail => draw_comet_bevelled_tail_path(
                    radius,
                    width,
                    0.0,
                    morphing_shape,
                    shape,
                    0.0,
                    ALT_ANGLE,
                ),
                ArcShape::Comet | ArcShape::ReverseComet => {
                    draw_comet_path(radius, width, 0.0, morphing_shape, shape, 0.0, ALT_ANGLE)
                }
                ArcShape::Meteor | ArcShape::ReverseMeteor => {
                    draw_comet_path(radius, width, 0.0, morphing_shape, shape, 0.0, ALT_ANGLE)
                }
            };

            // js closure
            callback.call3(
                &JsValue::NULL, 
                &JsValue::from_str(&path), 
                &JsValue::FALSE, 
                &JsValue::NULL,
            );
        }

    }
}
