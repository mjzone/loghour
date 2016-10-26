import * as types from './actionTypes';


export function loadOrganizationsSuccess(organizations) {
    return { type: types.LOAD_REPOS_SUCCESS, organizations };
}

export function loadOrganizations() {
    return function (dispatch) {
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => { throw (error);})
    };
}