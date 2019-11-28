import CurrentDcoument  from './current-document'
import { shallow , mount } from  'enzyme'
import  React  from 'react'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Redirect }  from 'react-router-dom';

it('it renders without crash', () => {
    shallow(<CurrentDcoument
        match={{ params: { id: 'root' }}}
    />);
});  
describe("update document",() => {
    let currentDoc=
      {
        "_id" : "100",
        "data": "This is updated data",
        "children": [],
        "title": "level1-folder",
        "type": "folder",
        "parentId": {"_id" :"5dd3a3e58a8e090011f3a520"}
    }
    const mock = new MockAdapter(axios);

    mock.onGet('http://localhost:8080/api/document/100').reply(200,currentDoc);
    mock.onPut('http://localhost:8080/api/document/100').reply(200,currentDoc);
    

   
    let wrapper = shallow(<CurrentDcoument.WrappedComponent
                    match={{ params: { id: '100' }}}
                />);
        beforeEach(() =>{
            wrapper.find("button").simulate('click'); 
      
           
        })
    it("it should update document", async() => {
        wrapper.update();
       expect(wrapper.instance().state.isSaved).toBe(true);
       expect(wrapper.find(Redirect).props().to).toBe('/folder/5dd3a3e58a8e090011f3a520');
    })


})


 