'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { fetchClient } from '@/lib/utils';

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password must be less than 50 characters' }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    const signupResponse = await fetchClient('/api/auth/registration', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(signupResponse);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="cursor-pointer" variant="outline">
          Login
        </Button>
      </form>
    </Form>
  );
}
