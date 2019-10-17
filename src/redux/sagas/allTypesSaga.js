import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getTypes(action) {
    try {
        const response = yield axios.get(`/api/shelter/types`);
        yield put({ type: 'SET_TYPES', payload: response.data });
        // console.log(response.data)
    } catch (error) {
        console.log("Error with GET request", error);
    }
}

function* allTypesSaga() {
    yield takeEvery('GET_TYPES', getTypes)
}

export default allTypesSaga;
