import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getShelters(action) {
    try {
        const response = yield axios.get(`/api/shelter/all`);
        yield put({ type: 'SET_SHELTERS', payload: response.data });
        console.log(response.data)
    } catch (error) {
        console.log("Error with GET request", error);
    }
}

function* allSheltersSaga() {
    yield takeEvery('GET_SHELTERS', getShelters)
}

export default allSheltersSaga;
