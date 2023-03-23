import Head from "next/head"
import { useContext } from "react"
import { DataContext } from "@/store/GlobalState"



const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const { users } = state

    return (
        <div className="table-responsive">
            <Head>
                <title>Users</title>
            </Head>

            <table className="table w-100">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index)=> (
                            <tr key={user._id} style={{cursor: 'pointer'}}>
                                <th>{index + 1}</th>
                                <th>{user._id}</th>
                                <th>
                                    <img src={user.avatar} alt={user.avatar}
                                    style={{width: '30px', height: '30px', overflow: 'hidden', objectFit: 'cover'}}/>
                                </th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>
                                    {
                                        user.role === 'admin'
                                        ? user.root ? <i className="bi bi-check-lg text-success"> Root</i>
                                                    : <i className="bi bi-check-lg text-success"></i>

                                        : <i className="bi bi-x-lg text-danger"></i>
                                    }
                                </th>
                                <th>Action</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users