import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getUserShelter(action) {
    try {
        const response = yield axios.get(`/api/shelter/user`);
        yield put({ type: 'SET_USER_SHELTER', payload: response.data });
        // console.log(response.data)
    } catch (error) {
        console.log("Error with GET request", error);
    }
}

function* getUserShelterInfo(action) {
    try {
        const response = yield axios.get(`/api/shelter/all/user`);
        yield put({ type: 'SET_USER_ALL_SHELTER_INFO', payload: response.data });
        // console.log(response.data)
    } catch (error) {
        console.log("Error with GET request", error);
    }
}

function* userShelterSaga() {
    yield takeEvery('GET_USER_SHELTER', getUserShelter)
    yield takeEvery('GET_USER_ALL_SHELTER_INFO', getUserShelterInfo)

}

export default userShelterSaga;
