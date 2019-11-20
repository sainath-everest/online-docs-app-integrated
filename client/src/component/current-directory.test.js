import React from 'react'
import {shallow,mount} from 'enzyme'
import DocumentAction from './document-action';
import CurrentDirectory from './current-directory';
import { exportAllDeclaration } from '@babel/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('it renders without crash', () => {
    let currentDoc={};
    let currentLevelDocs = [];
    shallow(<CurrentDirectory 
            currentDoc={currentDoc}
            currentLevelDocs = {currentLevelDocs}

    />);
});
it('it should select folder type from option drop-drown',() => {
    let currentLevelDocs = [];
    let isInitialLoad = false;
    let currentDirectory = {_id : "100",title : "sample"}
   let wrapper =  shallow(<CurrentDirectory 
            currentLevelDocs = {currentLevelDocs}
            isInitialLoad = {isInitialLoad}
            currentDirectory = {currentDirectory}

    />);
   
    wrapper.find('select').simulate('change', {target : {value : "doc"}});
    wrapper.update();
    expect(wrapper.instance().state.docType).toEqual("doc");
});
it('it should handle event when input filed value changes',() => {
    let currentLevelDocs = [];
    let isInitialLoad = false;
    let currentDirectory = {_id : "100",title : "sample"}
    
   let wrapper =  shallow(<CurrentDirectory 
            currentLevelDocs = {currentLevelDocs}
            isInitialLoad = {isInitialLoad}
            currentDirectory = {currentDirectory}

    />);
   
    wrapper.find('#create-new-doc').simulate('change', {target : {value : "DocNameFromInputFiled"}});
    wrapper.update();
    expect(wrapper.instance().state.docName).toEqual("DocNameFromInputFiled");
});
it('it should handle event after submit button click',() => {
    let currentLevelDocs = [];
    let isInitialLoad = false;
    let currentDirectory = {_id : "100",title : "sample"}
    let afterCreateNewItem = jest.fn();
    var newDoc = 
    { "_id" : "100",
    "data": "sample data",
    "children": [],
    "title": "level1-folder",
    "type": "folder",
    "parentId": "5dd3a3e58a8e090011f3a520"}
    var mock = new MockAdapter(axios);
    
   let wrapper =  shallow(<CurrentDirectory 
            currentLevelDocs = {currentLevelDocs}
            isInitialLoad = {isInitialLoad}
            currentDirectory = {currentDirectory}
            afterCreateNewItem = {afterCreateNewItem}

    />);
   
    wrapper.find('#new-doc-submit').simulate('change', {target : {}});
    mock.onPost('http://localhost:8080/api/document',newDoc).reply(200, {
        "_id" : "100",
       "data": "sample data",
       "children": [],
       "title": "level1-folder",
       "type": "folder",
       "parentId": "5dd3a3e58a8e090011f3a520"

     });
    wrapper.update();
   
});