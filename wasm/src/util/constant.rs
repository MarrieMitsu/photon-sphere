use std::str::FromStr;

use serde::Deserialize;

pub const ANGLE: f64 = 360.0;

pub const ALT_ANGLE: f64 = 359.99998;

pub const ANGLE_DIVISION: f64 = 90.0;

pub const HTML_NAMESPACE_URI: &str = "http://www.w3.org/1999/xhtml";

pub const SVG_NAMESPACE_URI: &str = "http://www.w3.org/2000/svg";

#[derive(Debug, Copy, Clone)]
pub enum ArcShape {
    Uniform,
    Rounded,
    Edge,
    ReverseEdge,
    DoubleEdge,
    ReverseDoubleEdge,
    BevelledEdge,
    UniformIontail,
    UniformAntitail,
    TopBevelledIontail,
    TopBevelledAntitail,
    BottomBevelledIontail,
    BottomBevelledAntitail,
    Comet,
    ReverseComet,
    Meteor,
    ReverseMeteor,
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseArcShapeError;

impl FromStr for ArcShape {
    type Err = ParseArcShapeError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "uniform" => Ok(ArcShape::Uniform),
            "rounded" => Ok(ArcShape::Rounded),
            "edge" => Ok(ArcShape::Edge),
            "reverse-edge" => Ok(ArcShape::ReverseEdge),
            "double-edge" => Ok(ArcShape::DoubleEdge),
            "reverse-double-edge" => Ok(ArcShape::ReverseDoubleEdge),
            "bevelled-edge" => Ok(ArcShape::BevelledEdge),
            "uniform-iontail" => Ok(ArcShape::UniformIontail),
            "uniform-antitail" => Ok(ArcShape::UniformAntitail),
            "top-bevelled-iontail" => Ok(ArcShape::TopBevelledIontail),
            "top-bevelled-antitail" => Ok(ArcShape::TopBevelledAntitail),
            "bottom-bevelled-iontail" => Ok(ArcShape::BottomBevelledIontail),
            "bottom-bevelled-antitail" => Ok(ArcShape::BottomBevelledAntitail),
            "comet" => Ok(ArcShape::Comet),
            "reverse-comet" => Ok(ArcShape::ReverseComet),
            "meteor" => Ok(ArcShape::Meteor),
            "reverse-meteor" => Ok(ArcShape::ReverseMeteor),
            _ => Err(ParseArcShapeError),
        }
    }
}

#[derive(Debug, Copy, Clone, Deserialize)]
pub enum Alignment {
    FaceIn,
    Center,
    FaceOut,
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseAlignmentError;

impl FromStr for Alignment {
    type Err = ParseAlignmentError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "face-in" => Ok(Alignment::FaceIn),
            "center" => Ok(Alignment::Center),
            "face-out" => Ok(Alignment::Center),
            _ => Err(ParseAlignmentError),
        }
    }
}
