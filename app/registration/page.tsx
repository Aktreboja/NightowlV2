import SignupForm from '@/components/forms/SignupForm';
import { withPageAuthRequired } from '@/lib/auth0/withPageAuthRequired';

const Registration = () => {
  return withPageAuthRequired(() => <SignupForm />, '/registration');
};

export default Registration;
