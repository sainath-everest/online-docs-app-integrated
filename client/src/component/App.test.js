import React from 'react'
import { shallow, mount } from 'enzyme'
import  App  from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('it renders without crash', () => {
    shallow(<App
        match={{ params: { id: 'root' }}}
    />);
});