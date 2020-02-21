# Resource Auditer

This is a tool meant to run audits on websites for checking the resources used, mainly third party.

## Installing

This tool should be installed globally:

```
npm install -g resource-auditer
```

or

```
yarn global add resource-auditer
```

## Use

To use the tool, run `audit-site <arguments>` from the command line.

There are two commands to run:

 * `-u <url>`: runs an resource audit on the URL passed.
 * `-a <api_key>`: sets the API key to use on the machine.

It is important to note that you **need** an API key from [Web Page Test](https://www.webpagetest.org/getkey.php) key to use the tool!
