import React from "react";

import Label from "../lib/components/Label";

export default {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: '`import { Label } from "@bigbinary/neetoui";`',
      },
    },
  },
};

const Template = ({ children, ...args }) => <Label {...args}>{children}</Label>;

export const Basic = Template.bind({});
Basic.args = {
  children: "This is a basic label",
};

export const Required = Template.bind({});
Required.args = {
  children: "This is a required label",
  required: true,
};