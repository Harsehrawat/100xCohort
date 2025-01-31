interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  }
  
  // For a profile display, only pick `name` and `email`
  type Profile = Pick<User, 'name' | 'email'>;
  
  type PartialProfile = Partial<Profile>;

  const displayProfile = (user: PartialProfile) => {
    console.log(`Name: ${user.name}`);
  };