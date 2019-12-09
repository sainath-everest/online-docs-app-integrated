import React from 'react'
import { shallow, mount } from 'enzyme'
import { CurrentDirectory } from './current-directory';
import { exportAllDeclaration } from '@babel/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('it renders without crash', () => {
    let currentDoc = {};
    let currentLevelDocs = [];
    shallow(<CurrentDirectory
        match={{ params: { id: 'root' }}}

    />);
});
it('it should select folder type from option drop-drown', () => {

    let wrapper = mount(<CurrentDirectory
        match={{ params: { id: 'root' }}}
    />);
    wrapper.find('select').simulate('change', { target: { value: "doc" } });
    wrapper.update();
    expect(wrapper.instance().state.docType).toEqual("doc");
});
it('it should handle event when input filed value changes', () => {
    let wrapper = mount(<CurrentDirectory
        match={{ params: { id: 'root' }}}
    />);
    wrapper.find('#create-new-doc').simulate('change', { target: { value: "test" } });
    wrapper.update();
    expect(wrapper.instance().state.docName).toEqual("test");
});
describe("create new folder/doc",  ()=>{
    const mock = new MockAdapter(axios);
    mock.onPost('http://localhost:8080/api/document').reply(200, {
    
            "_id": "100",
            "data": "sample data",
            "children": [],
            "title": "level1-folder", 
            "type": "folder",
            "parentId": "5dd3a3e58a8e090011f3a520"
            
        });

        let wrapper = shallow(<CurrentDirectory 
            match={{ params: { id: 'root' }}}
        />);

    beforeEach(()=>{
        wrapper.find("form").simulate("submit");
    });

    it('it should handle event after submit button click',async() => {
        wrapper.update();
            expect(wrapper.instance().state.currentLevelDocs.length).toEqual(1);
       
    
    });
})


