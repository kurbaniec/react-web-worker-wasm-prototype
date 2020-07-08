mod utils;

use crate::utils::set_panic_hook;
use ordo;
use ordo::action::Action;
use ordo_derive::{action, state, Action};
use serde::Deserialize;
use serde::Serialize;
use serde_json::Value;
use wasm_bindgen::__rt::std::rc::Rc;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn logging() {
    ordo::hi();
    log("Hello, bin!");
}

#[state]
pub struct Testo {
    counter: u8,
}

#[action]
enum SomeTest {
    INCREMENT,
    DECREMENT,
}

#[action]
enum MyAction {
    INCREMENT(String),
    DECREMENT,
}

fn baum(state: &Testo, action: MyAction, param: &Option<Rc<u64>>) -> Testo {
    log(&format!("STATE: {}", &state.counter));
    match action {
        MyAction::INCREMENT(some) => {
            log(&format!("INCREMENT: {}", &some));
        }
        MyAction::DECREMENT => log("DECREMENT"),
    }

    let param = param.as_ref().unwrap();
    log(&format!("PARAM: {}", &param));
    //Testo { ..*state }
    Testo {
        counter: state.counter + 1,
    }
}

#[action]
enum MyAction2 {
    INCREMENT(String),
    DECREMENT,
}

fn baum2(state: &Testo, action: MyAction2, param: &Option<Rc<u64>>) -> Testo {
    log(&format!("STATE2: {}", &state.counter));
    match action {
        MyAction2::INCREMENT(some) => {
            log(&format!("INCREMENT2: {}", &some));
        }
        MyAction2::DECREMENT => log("DECREMENT2"),
    }

    let param = param.as_ref().unwrap();
    log(&format!("PARAM:2 {}", &param));
    Testo {
        counter: state.counter + 1,
    }
}

#[wasm_bindgen]
pub fn test() {
    set_panic_hook();

    let param = Rc::new(10);

    let testo = Testo { counter: 0 };
    let mut node = ordo::create_store(testo, baum, Some(param.clone()));
    let val = node.get_state();
    log(&format!("VAL: {:?}", &val));

    // This dispatch works because the correct enum is used
    node.dispatch(MyAction::INCREMENT(String::from("INC")));
    node.dispatch(MyAction::INCREMENT(String::from("INC")));
    // This dispatch does not work because the incorrect enum is used
    node.dispatch(SomeTest::INCREMENT);

    let testo2 = Testo { counter: 10 };
    let testo3 = Testo { counter: 100 };
    let mut node2 = ordo::create_combined_store!(
        ordo::reducer!("test2", testo2, baum, Some(param.clone())),
        ordo::reducer!("test3", testo3, baum2, Some(param.clone()))
    );
    node2.dispatch(MyAction::INCREMENT(String::from("INC")));
    node2.dispatch(MyAction2::INCREMENT(String::from("INC2")));
    node2.dispatch(MyAction2::INCREMENT(String::from("INC2")));

    let val = node2.get_state();
    log(&format!("VAL: {:?}", &val));
}
