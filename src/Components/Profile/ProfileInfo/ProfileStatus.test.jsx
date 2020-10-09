import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import {act} from "react-test-renderer";

describe("ProfileStatus component", () => {
    test("After creation 'span' should be displayed", () => {
        const component = create(<ProfileStatus status="You clever man" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });

    test("After creation 'input' should not be displayed", () => {
        const component = create(<ProfileStatus status="You clever man" />);
        const root = component.root;

        expect(()=>{
            let input = root.findByType("input")
        }).toThrow();
    });
    test("Input should  be displayed instead of span", () => {
        const component =  create( <ProfileStatus status="You clever man" />);
        const root = component.root;
        act(() => {
        let span = root.findByType("span");
        span.props.onDoubleClick();
        });
        let input = root.findByType("input")
        expect(input.props.value).toBe("You clever man");
    });

});