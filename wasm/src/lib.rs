use std::{marker::PhantomData, str::FromStr};

use photon_sphere::PhotonSphere;
use serde::{de::Visitor, Deserialize, Deserializer, Serialize};
use serde_wasm_bindgen::Serializer;
use void::Void;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use util::constant::{Alignment, ArcShape, ParseAlignmentError};

extern crate console_error_panic_hook;

pub mod arc_shape;
pub mod photon_sphere;
pub mod util;

#[derive(Debug, Deserialize)]
pub enum Width {
    Single(f64),
    Collection(Vec<f64>),
}

impl From<f64> for Width {
    fn from(value: f64) -> Self {
        Width::Single(value)
    }
}

impl From<Vec<f64>> for Width {
    fn from(value: Vec<f64>) -> Self {
        Width::Collection(value)
    }
}

fn f64_or_f64array<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: Deserialize<'de> + From<f64> + From<Vec<f64>>,
    D: Deserializer<'de>,
{
    struct F64OrF64array<T>(PhantomData<fn() -> T>);

    impl<'de, T> Visitor<'de> for F64OrF64array<T>
    where
        T: Deserialize<'de> + From<f64> + From<Vec<f64>>,
    {
        type Value = T;

        fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
            formatter.write_str("f64 or [f64]")
        }

        fn visit_i64<E>(self, v: i64) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            let valid_i32 = i32::try_from(v).unwrap();
            self.visit_f64(f64::try_from(valid_i32).unwrap())
        }

        fn visit_u64<E>(self, v: u64) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            let valid_u32 = u32::try_from(v).unwrap();
            self.visit_f64(f64::try_from(valid_u32).unwrap())
        }

        fn visit_f32<E>(self, v: f32) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            self.visit_f64(v as f64)
        }

        fn visit_f64<E>(self, v: f64) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            Ok(From::from(v))
        }

        fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
        where
            A: serde::de::SeqAccess<'de>,
        {
            let mut widths: Vec<f64> = Vec::new();

            while let Some(e) = seq.next_element::<f64>()? {
                widths.push(e);
            }

            Ok(From::from(widths))
        }
    }

    deserializer.deserialize_any(F64OrF64array(PhantomData))
}

#[derive(Debug, Deserialize)]
pub enum Shape {
    #[serde(skip)]
    Single(ArcShape),

    #[serde(skip)]
    Collection(Vec<ArcShape>),
}

impl FromStr for Shape {
    type Err = Void;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Shape::Single(ArcShape::from_str(s).expect("shapes")))
    }
}

impl From<Vec<String>> for Shape {
    fn from(value: Vec<String>) -> Self {
        Shape::Collection(
            value
                .into_iter()
                .map(|e| ArcShape::from_str(&e).expect("shapes"))
                .collect(),
        )
    }
}

fn string_or_stringarray<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: Deserialize<'de> + FromStr<Err = Void> + From<Vec<String>>,
    D: Deserializer<'de>,
{
    struct StringOrStringarray<T>(PhantomData<fn() -> T>);

    impl<'de, T> Visitor<'de> for StringOrStringarray<T>
    where
        T: Deserialize<'de> + FromStr<Err = Void> + From<Vec<String>>,
    {
        type Value = T;

        fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
            formatter.write_str("string or [string]")
        }

        fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            Ok(FromStr::from_str(v).unwrap())
        }

        fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
        where
            A: serde::de::SeqAccess<'de>,
        {
            let mut shapes: Vec<String> = Vec::new();

            while let Some(e) = seq.next_element::<String>()? {
                shapes.push(e);
            }

            Ok(From::from(shapes))
        }
    }

    deserializer.deserialize_any(StringOrStringarray(PhantomData))
}

fn alignment<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: Deserialize<'de> + FromStr<Err = ParseAlignmentError>,
    D: Deserializer<'de>,
{
    struct Alignment<T>(PhantomData<fn() -> T>);

    impl<'de, T> Visitor<'de> for Alignment<T>
    where
        T: Deserialize<'de> + FromStr<Err = ParseAlignmentError>,
    {
        type Value = T;

        fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
            formatter.write_str("string")
        }

        fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
        where
            E: serde::de::Error,
        {
            Ok(FromStr::from_str(v).expect("align"))
        }
    }

    deserializer.deserialize_any(Alignment(PhantomData))
}

fn default_offset() -> f64 {
    0.0
}

fn default_arc_dasharray() -> Vec<f64> {
    Vec::new()
}

fn default_align() -> Alignment {
    Alignment::FaceOut
}

fn default_morphing_shape() -> bool {
    false
}

fn default_attributes() -> JsValue {
    JsValue::UNDEFINED
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Argument {
    radius: f64,

    #[serde(deserialize_with = "f64_or_f64array")]
    widths: Width,

    #[serde(deserialize_with = "string_or_stringarray")]
    shapes: Shape,

    #[serde(default = "default_offset")]
    offset: f64,

    #[serde(default = "default_arc_dasharray")]
    arc_dasharray: Vec<f64>,

    #[serde(default = "default_align", deserialize_with = "alignment")]
    align: Alignment,

    #[serde(default = "default_morphing_shape")]
    morphing_shape: bool,

    #[serde(default = "default_attributes", with = "serde_wasm_bindgen::preserve")]
    attributes: JsValue,
}

#[wasm_bindgen]
pub fn photon_sphere_wasm(argument: JsValue) -> Result<JsValue, JsValue> {
    console_error_panic_hook::set_once();

    let args: Argument = serde_wasm_bindgen::from_value(argument)?;

    let p = PhotonSphere::new(
        args.radius,
        args.widths,
        args.shapes,
        args.offset,
        &args.arc_dasharray,
        &args.align,
        args.morphing_shape,
        &args.attributes,
    );

    let res = p
        .arc_path
        .serialize(&Serializer::new().serialize_maps_as_objects(true))?;

    Ok(res)
}
