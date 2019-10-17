import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getTags(action) {
    try {
        const response = yield axios.get(`/api/shelter/tags`);
        yield put({ type: 'SET_TAGS', payload: response.data });
        // console.log(response.data)
    } catch (error) {
        console.log("Error with GET request", error);
    }
}

function* allTagsSaga() {
    yield takeEvery('GET_TAGS', getTags)
}

export default allTagsSaga;
