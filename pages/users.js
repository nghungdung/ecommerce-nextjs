import Head from "next/head"
import { useContext } from "react"
import { DataContext } from "@/store/GlobalState"
import Link from "next/link"


const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const { users, auth } = state

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
                                <th>
                                    <Link href={auth.user.root && auth.user.email || user.email
                                    ? `/edit_user/${user._id}` : '#!'}>
                                        <i className="bi bi-pencil-square text-info me-2" title="Edit"></i>
                                    </Link>

                                    {
                                        auth.user.root && auth.user.email || user.email
                                        ? <i className="bi bi-trash3 text-danger ms-2" title="Remove"
                                        data-toggle="modal" data-target="#exampleModal"></i>

                                        : <i className="bi bi-trash3 text-danger ms-2" title="Remove"></i>
                                    }
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users