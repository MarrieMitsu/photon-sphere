pub struct MoveTo;

#[allow(non_snake_case)]
impl MoveTo {
    pub fn M(x: f64, y: f64) -> String {
        format!("M {x},{y}")
    }

    pub fn m(dx: f64, dy: f64) -> String {
        format!("m {dx},{dy}")
    }
}

pub struct LineTo;

#[allow(non_snake_case)]
impl LineTo {
    pub fn L(x: f64, y: f64) -> String {
        format!("L {x},{y}")
    }

    pub fn l(dx: f64, dy: f64) -> String {
        format!("l {dx},{dy}")
    }

    pub fn H(x: f64) -> String {
        format!("H {x}")
    }

    pub fn h(dx: f64) -> String {
        format!("H {dx}")
    }

    pub fn V(y: f64) -> String {
        format!("V {y}")
    }

    pub fn v(dy: f64) -> String {
        format!("v {dy}")
    }
}

pub struct CubicBezierCurve;

#[allow(non_snake_case)]
impl CubicBezierCurve {
    pub fn C(x1: f64, y1: f64, x2: f64, y2: f64, x: f64, y: f64) -> String {
        format!("C {x1},{y1} {x2},{y2} {x},{y}")
    }

    pub fn c(dx1: f64, dy1: f64, dx2: f64, dy2: f64, dx: f64, dy: f64) -> String {
        format!("c {dx1},{dy1} {dx2},{dy2} {dx},{dy}")
    }

    pub fn S(x2: f64, y2: f64, x: f64, y: f64) -> String {
        format!("S {x2},{y2} {x},{y}")
    }

    pub fn s(dx2: f64, dy2: f64, dx: f64, dy: f64) -> String {
        format!("s {dx2},{dy2} {dx},{dy}")
    }
}

pub struct EllipticalArcCurve;

#[allow(non_snake_case)]
impl EllipticalArcCurve {
    pub fn A(
        rx: f64,
        ry: f64,
        angle: f64,
        large_arc_flag: u8,
        sweep_flag: u8,
        x: f64,
        y: f64,
    ) -> String {
        format!("A {rx},{ry} {angle} {large_arc_flag} {sweep_flag} {x},{y}")
    }

    pub fn a(
        rx: f64,
        ry: f64,
        angle: f64,
        large_arc_flag: u8,
        sweep_flag: u8,
        x: f64,
        y: f64,
    ) -> String {
        format!("a {rx},{ry} {angle} {large_arc_flag} {sweep_flag} {x},{y}")
    }
}

pub const CLOSE_PATH: &str = "Z";
