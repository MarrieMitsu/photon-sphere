pub const ANGLE: f64 = 360.0;

pub const ALT_ANGLE: f64 = 359.99998;

pub const ANGLE_DIVISION: f64 = 90.0;

pub const HTML_NAMESPACE_URI: &str = "http://www.w3.org/1999/xhtml";

pub const SVG_NAMESPACE_URI: &str = "http://www.w3.org/2000/svg";

#[derive(Copy, Clone)]
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

#[derive(Copy, Clone)]
pub enum Alignment {
    FaceIn,
    Center,
    FaceOut,
}
