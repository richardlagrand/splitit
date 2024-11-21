import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addPaymentSchema from "../schemas/addPaymentSchema";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface addPaymentFormProps {
  onSubmit: (data: any) => void;
}

const addPaymentForm: React.FC<addPaymentFormProps> = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      description: "",
      amount: 0,
      tags: [],
    },
  });

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the tenants first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the tenants last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Email tenant</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter the email of the one who pays the bill"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Give a short description for this bill (like rent of month xyz)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the amount to be paid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Tags separated by comma</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Use tags to categorize the payment, for instance: rent, october"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2 mt-5 mb-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Button type="submit" className="w-full mt-4">
          Create payment link
        </Button>
        <p className="text-center mt-4 font-light text-sm">
          After submitting you will receive a payment link that you can forward
          to your tenant
        </p>
      </form>
    </Form>
  );
};

export default addPaymentForm;
