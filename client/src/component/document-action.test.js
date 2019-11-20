import React from 'react'
import {shallow,mount} from 'enzyme'
import DocumentAction from './document-action';
import { MenuItem } from 'react-contextmenu';


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
            title = {title}
            currentDoc={currentDoc}

    />);
});
it('it should call callback function after the button is clicked', () => {
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
    const onClick = jest.fn();
    let wrapper = mount(<DocumentAction 
                         title = {title}
                        currentDoc={currentDoc} 
                        onClick={onClick}/>);
    wrapper.find('button').first().simulate('click');
    expect(onClick).toBeCalled();
    expect(onClick.mock.calls.length).toEqual(1);
});
it('it should call callback function after clicked context menu of button', () => {
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
    const menuClick = jest.fn();
    let wrapper = mount(<DocumentAction 
                         title = {title}
                        currentDoc={currentDoc} 
                        onClick={menuClick}/>);
    wrapper.find('button').first().simulate('click');
    wrapper.find(MenuItem).first().simulate('click');
    expect(menuClick).toBeCalled();
    expect(menuClick.mock.calls.length).toEqual(1);
});