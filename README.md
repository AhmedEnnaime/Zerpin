
# Zerpin

Zerpin is an ERP that treats the HR module from the recruitment to the pay passing by many submodules like employees, departments, holidays and payslips. Zerpin offer a stable and scalable managment of the HR of a company with the interaction with external Api like Linkedin. 

The ERP contains 3 principales roles with different priviliges :

***ADMIN*** : Granted the priviliges to do all sorts of things

***DEPARTMENT CHEF*** : Granted to Validate or reject holidays requests for the employees of it's department and the possibility to request a holiday that needs to be validated by the admin and others priviliges...

***EMPLOYEE*** : Limited priviliges like requesting a holiday and visualising other employees in the company and updating his profile




## Deployment

To deploy this project on your machine the first thing you need to have Docker installed, Laravel 10+ and reactjs V18+

After meeting the requirments above you can clone the repository using the following command

```bash
  git clone https://github.com/AhmedEnnaime/Zerpin.git
```

After cloning the repository you need to surf to the backend folder

```bash
  cd backend
```

You can configure a shell alias to avoid calling every time vendor/bin/sail by executing the following command

```bash
  alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```

Now you can build you entire project for the first time using this command

```bash
  sail up --build -d
```

After bulding it for the first time you can run it afterwards like that

```bash
  sail up -d
```

To stop your containers

```bash
  sail stop
```

To remove your containers

```bash
  sail down
```


## Tech Stack

**Client:** ReactJs V18, Typescript, Redux Toolkit, TailwindCSS

**Server:** Laravel 10

**Tools:** Docker, Sail


## Feedback

If you have any feedback, please reach out to me at ahmedennaime20@gmail.com


## Support

For support, email ahmedennaime20@gmail.com or join me on linkedin Ahmed Ennaime.

