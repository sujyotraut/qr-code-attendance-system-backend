interface UserLocals {
  user: {
    id: string;
    email: string;
    username: string;
    role: 'admin' | 'student' | 'teacher';
  };
}

export default UserLocals;
