import React from 'react'
import {shallow,mount} from 'enzyme'
import DocumentAction from './document-action';
import { MenuItem } from 'react-contextmenu';
import { CurrentDirectory } from './current-directory';
import { MemoryRouter, Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('it renders without crash', () => {
    let title = "test";
    let currentDoc=
                {
                    "_id" : "100",
                    "data": "",
                    "children": [],
                    "title": "level1-folder",
                    "type": "folder",
                    "parentId": "5dd3a3e58a8e090011f3a520"
                }
    shallow(<DocumentAction 
        value={title}
        currentDoc={currentDoc}

    />);
});
it('it should click on folder/doc button', () => {    
    let title = "test";
    let currentDoc=
                {
                    "_id" : "100",
                    "data": "",
                    "children": [],
                    "title": "level1-folder",
                    "type": "folder",
                    "parentId": "5dd3a3e58a8e090011f3a520"
                }
        let wrapper = shallow(<DocumentAction.WrappedComponent
                        value = {title}
                        currentDoc={currentDoc} 
                        />);     
    wrapper.find("button").first().simulate('click');  
    expect(wrapper.find(Link).props().to).toBe('/folder/100');

   });

   describe("delete folder/doc",()=>{
    const mock = new MockAdapter(axios);
    mock.onDelete('http://localhost:8080/api/document/100').reply(200);

    let title = "test";
    let currentDoc=
                  {
                    "_id" : "100",
                    "data": "",
                    "children": [],
                    "title": "level1-folder",
                    "type": "folder",
                    "parentId": "5dd3a3e58a8e090011f3a520"
                }

        let wrapper = shallow(<DocumentAction.WrappedComponent
            value = {title}
            currentDoc={currentDoc} 
        />);

    beforeEach(()=>{
        wrapper.find("MenuItem").simulate('click',{},{currentDoc: currentDoc, option: "delete" });  
    });

    it('it should handle event after delete button click', async () => {
        await wrapper.update();
        expect(wrapper.instance().state.isDocDeleted).toBe(true);
        expect(wrapper.find(Redirect).props().to).toBe('/folder/5dd3a3e58a8e090011f3a520');
       
    
    });
})
