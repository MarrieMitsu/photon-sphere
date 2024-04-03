fn main() {
    let a = test();
    println!("Hello {}", a);
}

fn test() -> usize {
    let a = 3;
    let b: Option<usize> = Some(1);

    let c: usize;

    match b {
        Some(val) => c = val,
        None => return a,
    }

    c
}
