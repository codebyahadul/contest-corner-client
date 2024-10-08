
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const Login = () => {
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        watch,
        reset,
      } = useForm()
    const { signInWithGoogle, signIn } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onSubmit = async data => {
        setLoading(true)
        signIn(data.email, data.password)
            .then(() => {
                toast.success("Successfully log in !!")
                navigate(location?.state ? location?.state : '/')
                setLoading(false)
            })
            .catch(err => {
                toast.error(err?.message)
                reset()
                setLoading(false)
                return 
            })
    }

    const handleGoggleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Successfully log in !!")
                navigate(location?.state ? location?.state : '/')
            })
            .catch(err => toast.error(err?.message))
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                {...register('email', {required: true})}
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-secondary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                {...register('password', {required: true})}
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-secondary bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-primary w-full rounded-md py-3 text-white flex items-center justify-center text-center'
                        >
                            {loading ? <TbFidgetSpinner className='animate-spin' /> : 'Continue'}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-secondary text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <button
                    disabled={loading}
                    onClick={handleGoggleSignIn}
                    className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </button>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/signUp'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login