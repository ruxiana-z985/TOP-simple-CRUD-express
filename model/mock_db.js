class userStorage{
    #storage
    #id
    constructor(){
        this.#id = 0
        this.#storage = {}
    }

    getAllUsers(){
        return this.#storage
    }

    searchUser(username){
        let users = Object.keys(this.#storage).filter(userId=>{
            this.#storage[userId].firstname == this || this.#storage[userId].lastname == this
        },username)

        return users
    }
    
    getSingeUser(userId){
        if (userId in this.#storage){
            return this.#storage[userId]
        }
        return {}
    }

    createUser(firstname,lastname){
        try
        {
        this.#id +=1
        this.#storage[this.#id] = {firstname:firstname,lastname:lastname}
        return {isSuccess:true,message:null}
    }catch(err){
        console.log("error happend in creating user part",err)
        return {isSuccess:false,message:"error in adding user"}
    }

    }

    deleteUser(userId){
       try
        {
        if (this.#storage[userId]){
            delete this.#storage[userId]
            return {isSuccess:true,message:null}
        }
    }
        catch(err){
            console.log("error in deleting user",err)
            return {isSuccess:false,message:"error in deleting user"}
        }
    }

    updateUser(userId,firstname,lastname){
        try {
            if(this.#storage[userId]){
                this.#storage[userId].firstname = firstname
                this.#storage[userId].lastname = lastname
                return {isSuccess:true,message:null}
            }
        } catch (error) {
            console.log("error in updating user",err)
            return {isSuccess:false,message:"error in updating user information"}
        }
    }



}

exports.db = new userStorage()