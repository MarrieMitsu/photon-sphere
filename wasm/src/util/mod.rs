pub mod constant;
pub mod formula;
pub mod path_command;

use js_sys::{Array, Object};
use wasm_bindgen::{JsCast, JsValue};

use self::{constant::*, formula::LocusPoint};
use std::f64::consts::PI;

pub fn degree_to_radians(degree: f64) -> f64 {
    degree * (PI / 180 as f64)
}

pub fn radians_to_degree(radians: f64) -> f64 {
    radians / (PI / 180 as f64)
}

pub fn fixed_degree(degree: f64) -> f64 {
    if (degree / ANGLE) > 0.0 && (degree % ANGLE) == 0.0 {
        return ALT_ANGLE;
    }

    degree % ANGLE
}

pub fn fixed_decimal(number: f64) -> f64 {
    let length = 4;

    f64::round((number + f64::EPSILON) * 10_f64.powf(length as f64)) / 10_f64.powf(length as f64)
}

pub fn calc_margin(width: f64, largest_width: f64, align: &Alignment) -> f64 {
    let margin = (largest_width / 2.0) - (width / 2.0);

    match align {
        Alignment::FaceIn => margin * 2.0,
        Alignment::Center => margin,
        Alignment::FaceOut => 0.0,
    }
}

pub fn largest_number_in_vec(vec: &[f64]) -> f64 {
    let mut temp = vec[0];

    for i in 0..vec.len() {
        if temp < vec[i] {
            temp = vec[i];
        }
    }

    temp
}

pub fn get_large_arc_flag(degree: f64, morphing_shape: bool) -> u8 {
    if morphing_shape {
        return 0;
    }

    if degree > 180.0 {
        1
    } else {
        0
    }
}

pub fn draw_arcs(
    morphing_shape: bool,
    large_arc_flag: u8,
    sweep_flag: u8,
    locus: &[LocusPoint],
) -> String {
    #[allow(non_snake_case)]
    let mut A = String::new();
    let mut i = 0;

    if morphing_shape {
        let division = (ANGLE / ANGLE_DIVISION).ceil() as usize;

        while i < division {
            let (radius, point) = if locus.len() >= (i + 1) {
                (locus[i].radius, locus[i].point)
            } else {
                (locus[locus.len() - 1].radius, locus[locus.len() - 1].point)
            };

            let path = path_command::EllipticalArcCurve::A(
                radius,
                radius,
                0.0,
                large_arc_flag,
                sweep_flag,
                point.x,
                point.y,
            );

            A.push_str(&path);
            A.push_str(" ");

            i += 1;
        }
    } else {
        while i < locus.len() {
            let (radius, point) = (locus[i].radius, locus[i].point);

            let path = path_command::EllipticalArcCurve::A(
                radius,
                radius,
                0.0,
                large_arc_flag,
                sweep_flag,
                point.x,
                point.y,
            );

            A.push_str(&path);
            A.push_str(" ");

            i += 1;
        }
    }

    A
}

pub fn js_object_iter(value: &JsValue) -> Result<js_sys::IntoIter, JsValue> {
    match js_sys::try_iter(value)? {
        Some(e) => Ok(e),
        None => {
            if value.is_object() {
                let obj = Object::entries(value.unchecked_ref());
                let iter = js_sys::try_iter(&obj)?
                    .ok_or_else(|| JsValue::from_str("failed"))?;
                Ok(iter)
            } else {
                Err(JsValue::from_str("failed"))
            }
        }
    }
}

pub fn js_array(value: &JsValue) -> Option<&Array> {
    if value.is_array() {
        value.dyn_ref::<Array>()
    } else {
        None
    }
}
