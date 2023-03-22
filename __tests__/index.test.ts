import * as crudController from '../controllers/index'
import * as console from "console"

const getUserQuery="SELECT * FROM user WHERE PersonId =?";
let getReq={
    params:{
        userID:2
    }
}
let mockgetRes={"statusCode":200,"body":[{"PersonID":2,"name":"test1","email":"test@gmail.com","dob":"1972-06-28T18:30:00.000Z"}]}
// const deleteUserQuery="DELETE FROM user WHERE PersonID = ?;"

jest.mock('mysql',()=>({
    createConnection:jest.fn().mockImplementation(()=>({
        query:jest.fn((query,requestData)=>{
            switch (query) {
                case getUserQuery:
                    console.log("got here")
                    return mockgetRes
                default:
                    break;
            }
        })
    }))
}))

describe("check user crud", () => {
    it("check get scenario", async() => {
        let getMockFunc=jest.spyOn(crudController,"getUser").mockReturnValue(mockgetRes as any)
        crudController.getUser({},{})
       expect(getMockFunc).toBeCalledTimes(1)
       
    });

    it("check get scenario", async() => {
        let getMockFunc=jest.spyOn(crudController,"deleteUser").mockReturnThis()
        crudController.deleteUser({},{})
       expect(getMockFunc).toBeCalledTimes(1)
    });

    it("check get scenario", async() => {
        let getMockFunc=jest.spyOn(crudController,"updateUser").mockReturnThis()
        crudController.updateUser({},{})
       expect(getMockFunc).toBeCalledTimes(1)
    });
    
    it("check get scenario", async() => {
        let getMockFunc=jest.spyOn(crudController,"createUser").mockReturnThis()
        crudController.createUser({},{})
       expect(getMockFunc).toBeCalledTimes(1)
    });
  });