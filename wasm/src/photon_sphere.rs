use js_sys::{Array, Object};
use serde::Serialize;
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
        fixed_degree, js_array, js_object_iter, largest_number_in_vec,
    },
    Shape, Width,
};

#[derive(Debug, Serialize)]
pub struct ArcPath {
    pub path: String,

    #[serde(with = "serde_wasm_bindgen::preserve")]
    pub attributes: Object,
}

/// PhotonSphere
pub struct PhotonSphere {
    pub arc_path: Vec<ArcPath>,
}

impl PhotonSphere {
    pub fn new<'a>(
        radius: f64,
        widths: Width,
        shapes: Shape,
        offset: f64,
        arc_dasharray: &'a [f64],
        align: &Alignment,
        morphing_shape: bool,
        attributes: &JsValue,
    ) -> Self {
        let mut arc_path: Vec<ArcPath> = Vec::new();
        let mut threshold = 0.0;
        let mut i = 0;
        let mut j = 0;

        let mut width: f64;
        let largest_width: f64;
        match widths {
            Width::Collection(ref val) if val.len() > 0 => {
                width = val[0];
                largest_width = largest_number_in_vec(&val);
            }
            Width::Collection(_) => return PhotonSphere { arc_path },
            Width::Single(val) => {
                width = val;
                largest_width = val;
            }
        };

        let mut shape: ArcShape;
        match shapes {
            Shape::Collection(ref val) if val.len() > 0 => {
                shape = val[0];
            }
            Shape::Collection(_) => return PhotonSphere { arc_path },
            Shape::Single(val) => {
                shape = val;
            }
        };

        threshold += offset;

        if arc_dasharray.len() > 0 {
            // prevent infinite loop causing by zero as initial value
            if fixed_degree(arc_dasharray[0]) == 0.0 {
                return PhotonSphere { arc_path };
            }

            while threshold < ANGLE {
                let is_odd = (i + 1) % 2 != 0;
                let attrs = Object::new();

                let mut degree = fixed_degree(arc_dasharray[i % arc_dasharray.len()]);
                if degree > (ANGLE - threshold) {
                    degree = ANGLE - threshold;
                }

                if let Width::Collection(ref val) = widths {
                    width = val[j % val.len()];
                }

                if let Shape::Collection(ref val) = shapes {
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

                    if let Some(attributes) = js_object_iter(attributes).ok() {
                        for x in attributes {
                            let x = x.unwrap();

                            let (key, value) = {
                                let pair = x.unchecked_into::<Array>();
                                (pair.get(0), pair.get(1))
                            };

                            if let Some(e) = js_array(&value) {
                                if e.length() > 0 {
                                    js_sys::Reflect::set(&attrs, &key, &e.get((j as u32) % e.length()))
                                        .unwrap();
                                }
                            } else {
                                js_sys::Reflect::set(&attrs, &key, &value).unwrap();
                            }
                        }
                    }

                    arc_path.push(ArcPath {
                        path,
                        attributes: attrs,
                    });
                    j += 1;
                }

                threshold += degree;
                i += 1;
            }
        } else {
            let attrs = Object::new();

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

            if let Some(attributes) = js_object_iter(attributes).ok() {
                for x in attributes {
                    let x = x.unwrap();

                    let (key, value) = {
                        let pair = x.unchecked_into::<Array>();
                        (pair.get(0), pair.get(1))
                    };

                    if let Some(e) = js_array(&value) {
                        if e.length() > 0 {
                            js_sys::Reflect::set(&attrs, &key, &e.get(0)).unwrap();
                        }
                    } else {
                        js_sys::Reflect::set(&attrs, &key, &value).unwrap();
                    }
                }
            }

            arc_path.push(ArcPath {
                path,
                attributes: attrs,
            });
        }

        PhotonSphere { arc_path }
    }
}
