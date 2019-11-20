import CurrentDcoument  from './current-document'
import { shallow , mount } from  'enzyme'
import  React  from 'react'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('it renders without crash', () => {
    let currentDoc=
                {
                    "_id" : "100",
                    "data": "",
                    "children": [],
                    "title": "level1-folder",
                    "type": "folder",
                    "parentId": "5dd3a3e58a8e090011f3a520"
                }
    shallow(<CurrentDcoument doc={currentDoc}/>);
});

// it('it should call callback function after the save button clicked', () => {
//     let currentDoc=
//                 {
//                     "_id" : "100",
//                     "data": "",
//                     "children": [],
//                     "title": "level1-folder",
//                     "type": "folder",
//                     "parentId": "5dd3a3e58a8e090011f3a520"
//                 }
//     const onClick = jest.fn();
//     let wrapper = mount(<CurrentDcoument 
//                         doc={currentDoc} 
//                         onClick={onClick}/>);
//     wrapper.find('button').first().simulate('click');
//     expect(onClick).toBeCalled();
//     expect(onClick.mock.calls.length).toEqual(1);
//});
    
   
it('it tests componentDidMount', async() => {
    let currentDoc=
                {
                    "_id" : "100",
                    "data": "",
                    "children": [],
                    "title": "level1-folder",
                    "type": "folder",
                    "parentId": "5dd3a3e58a8e090011f3a520"
                }

    var mock = new MockAdapter(axios);
    var response = 
        { "_id" : "100",
        "data": "sample data",
        "children": [],
        "title": "level1-folder",
        "type": "folder",
        "parentId": "5dd3a3e58a8e090011f3a520"}
      

    mock.onGet('http://localhost:8080/api/document/100').reply(200, {
         "_id" : "100",
        "data": "sample data",
        "children": [],
        "title": "level1-folder",
        "type": "folder",
        "parentId": "5dd3a3e58a8e090011f3a520"

      });
    
    let wrapper = shallow(<CurrentDcoument 
                    doc={currentDoc} 
                    />);
        await wrapper.instance().componentDidMount();

        expect(wrapper.instance().state.docData).toEqual("sample data");
                    
    
});