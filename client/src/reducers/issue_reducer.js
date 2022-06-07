export const issueRqquestReducer = (state = { issueBookItems: [] }, action) => {
        switch (action.type) {
            case 'ISSUE_REQUEST':
                return {...state, loading: true }
            case 'ISSUE_REQUEST_SUCCESS':
                return {...state,
                    issueBookItems: [...state.issueBookItems, action.payload],
                    loading: false
                }



            default:
                return state
        }
    }
    //newly
export const getEveryDayBookReducer = (state = { allCounts: [] }, action) => {
    console.log("hari");
    console.log(action.payload)
    switch (action.type) {
        case 'GET_ALLBOOKSS':
            return {...state, loading: true }
        case "GET_ALLBOOKS_SUCCESSED":
            console.log(action.payload)
            console.log("grjng");
            console.log(state)
            console.log("grtmgjr")
            return {
                allCounts: action.payload,
                loading: false
            }
        case 'GET_ALLBOOKS_FAILEDD':
            return { error: action.payload, payload: false }
        default:
            console.log("bgtkjgt");
            console.log(state);
            return state
    }
    // switch(action.type){
    //     case 'GET_BOOKS_REQUEST':
    //         return {...state,loading:true}
    //     case 'GET_BOOKS_SUCCESS':
    //         return {
    //             books:action.payload,loading:false
    //         }    
    //     case 'GET_BOOKS_FAILED':
    //         return {error:action.payload,loading:false}
    //     default:
    //         return state         
    // }
}

export const getAllIssueBookReqReducer = (state = { issuebooks: [] }, action) => {
    switch (action.type) {
        case 'GET_All_ISSUES_REQUEST':
            return {...state, loading: true }
        case 'GET_All_ISSUES_SUCCESS':
            return {
                issuebooks: action.payload,
                loading: false
            }
        case 'GET_All_ISSUES_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}
export const userIssuedBookReducer = (state = { userIssuedBook: [] }, action) => {
    switch (action.type) {
        case 'USER_ISSUED_BOOK':
            return {...state, loading: true }
        case 'USER_ISSUED_BOOK_SUCCESS':
            return {
                userIssuedBook: action.payload,
                loading: false
            }
        case 'USER_ISSUED_BOOK_FAILED':
            return { error: action.payload, loading: false }
        default:

            return state
    }
}

export const allIssuedBookReducer = (state = { all_IssuedBook: [] }, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'ALL_ISSUED_BOOK':
            return {...state, loading: true }
        case 'ALL_ISSUED_BOOK_SUCCESS':
            // console.log("all issued book succeesed");

            return {
                all_IssuedBook: action.payload,
                loading: false
            }
        case 'ALL_ISSUED_BOOK_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const singleIssuedBookReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SINGLE_ISSUE_REQUEST':
            return {...state, loading: true }
        case 'SINGLE_ISSUE_REQUEST_SUCCESS':
            return {
                singleIsBook: action.payload,
                loading: false
            }
        case 'SINGLE_ISSUE_REQUEST_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}