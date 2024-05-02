import dashboardReducer from './DashboardSlice'
describe('test case for dashboard slice',()=>{
    it('check for initial state',()=>{
        expect(dashboardReducer(undefined,{})).toEqual{}
    })
})