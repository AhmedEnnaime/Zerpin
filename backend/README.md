<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Zerpin Api

The backend part of Zerpin ERP uses laravel 10 for creating Api with sanctum in the authentication. The backend part is dockerized with the help of laravel sail.

## API Reference

#### Get all users

```http
  GET /api/users
```

| Parameter       | Type      | Description                         |
| :-------------- | :-------- | :---------------------------------- |
| `id`            | `integer` | **Required**.Id of user             |
| `fname`         | `string`  | **Required**. First name of user    |
| `lname`         | `string`  | **Required**. Last name of user     |
| `birthday`      | `string`  | **Required**. Birthday of user      |
| `cin`           | `string`  | **Required**. Cin of user           |
| `img`           | `string`  | **Required**. Image of user         |
| `phone`         | `string`  | **Required**. Phone number of user  |
| `role`          | `enum`    | **Required**. Role of user          |
| `department_id` | `integer` | **Required**. Department id of user |
| `email`         | `string`  | **Required**. Email of user         |
| `password`      | `string`  | **Required**. Password of user      |
| `contract`      | `object`  | Contract of user                    |
| `department`    | `object`  | Department of user                  |
| `holidays`      | `Array`   | Holidays taken by the user          |

#### Get all contracts

```http
  GET /api/contracts
```

| Parameter      | Type      | Description                                         |
| :------------- | :-------- | :-------------------------------------------------- |
| `ref`          | `string`  | **Required**. Reference of the contract             |
| `position`     | `string`  | **Required**. Position of the user                  |
| `debut_date`   | `date`    | **Required**. Debut date of contract                |
| `final_date`   | `date`    | **Required**. Final date of contract                |
| `base_salary`  | `double`  | **Required**. Base salary of contract               |
| `final_salary` | `double`  | **Required**. Final salary of user                  |
| `rules`        | `Array`   | **Required**. Rules applied to the contract of user |
| `state`        | `enum`    | **Required**. State of contract                     |
| `user_id`      | `integer` | **Required**. id of user                            |

#### Get one contract

```http
  GET /api/contracts/{id}
```

| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `id`      | `integer` | **Required**. Id of the contract |

#### Get all rules

```http
  GET /api/rules
```

| Parameter | Type      | Description                                                 |
| :-------- | :-------- | :---------------------------------------------------------- |
| `id`      | `integer` | **Required**. id of the rule                                |
| `name`    | `string`  | **Required**. Name of the rule                              |
| `type`    | `string`  | **Required**. Type of the rule                              |
| `rate`    | `double`  | **Required**. Rate of deduction or augmentation of the rule |

#### Get one rule

```http
  GET /api/rules/{id}
```

| Parameter | Type      | Description                  |
| :-------- | :-------- | :--------------------------- |
| `id`      | `integer` | **Required**. id of the rule |

#### Create contract and user

```http
  POST /api/contracts
```

| Parameter       | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| `fname`         | `string`  | **Required**. First name of user                     |
| `lname`         | `string`  | **Required**. Last name of user                      |
| `birthday`      | `string`  | **Required**. Birthday of user                       |
| `cin`           | `string`  | **Required**. Cin of user                            |
| `img`           | `string`  | **Required**. Image of user                          |
| `phone`         | `string`  | **Required**. Phone number of user                   |
| `role`          | `enum`    | **Required**. Role of user                           |
| `department_id` | `integer` | **Required**. Department id of user                  |
| `email`         | `string`  | **Required**. Email of user                          |
| `position`      | `string`  | **Required**. Position of the user                   |
| `debut_date`    | `date`    | **Required**. Debut date of contract                 |
| `final_date`    | `date`    | **Required**. Final date of contract                 |
| `base_salary`   | `double`  | **Required**. Base salary of contract                |
| `rule_id[]`     | `integer` | **Required**. id of the rule applied on the contract |

#### Renew contract

```http
  PUT /api/renewContract/{id}
```

| Parameter       | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| `id`            | `integer` | **Required**. id of the contract                     |
| `fname`         | `string`  | **Required**. First name of user                     |
| `lname`         | `string`  | **Required**. Last name of user                      |
| `birthday`      | `string`  | **Required**. Birthday of user                       |
| `cin`           | `string`  | **Required**. Cin of user                            |
| `img`           | `string`  | **Required**. Image of user                          |
| `phone`         | `string`  | **Required**. Phone number of user                   |
| `role`          | `enum`    | **Required**. Role of user                           |
| `department_id` | `integer` | **Required**. Department id of user                  |
| `email`         | `string`  | **Required**. Email of user                          |
| `position`      | `string`  | **Required**. Position of the user                   |
| `debut_date`    | `date`    | **Required**. Debut date of contract                 |
| `final_date`    | `date`    | **Required**. Final date of contract                 |
| `base_salary`   | `double`  | **Required**. Base salary of contract                |
| `rule_id[]`     | `integer` | **Required**. id of the rule applied on the contract |

#### Finish contract

```http
  DELETE /api/contracts/{id}
```

| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `id`      | `integer` | **Required**. id of the contract |

#### Get all departments

```http
  GET /api/departments
```

| Parameter     | Type      | Description                             |
| :------------ | :-------- | :-------------------------------------- |
| `id`          | `integer` | **Required**. id of department          |
| `name`        | `string`  | **Required**. Name of dpartment         |
| `description` | `string`  | **Required**. Description of department |
| `users`       | `Array`   | **Required**. Users in department       |

#### Get one department

```http
  GET /api/departments/{id}
```

| Parameter | Type      | Description                        |
| :-------- | :-------- | :--------------------------------- |
| `id`      | `integer` | **Required**. id of the department |

#### Create department

```http
  POST /api/departments
```

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `name`        | `string` | **Required**. Name of dpartment         |
| `description` | `string` | **Required**. Description of department |

#### Create department

```http
  PUT /api/departments/{id}
```

| Parameter     | Type      | Description                             |
| :------------ | :-------- | :-------------------------------------- |
| `id`          | `integer` | **Required**. id of dpartment           |
| `name`        | `string`  | **Required**. Name of dpartment         |
| `description` | `string`  | **Required**. Description of department |

#### Delete department

```http
  DELETE /api/departments/{id}
```

| Parameter | Type      | Description                        |
| :-------- | :-------- | :--------------------------------- |
| `id`      | `integer` | **Required**. id of the department |

#### Get all recruitments

```http
  GET /api/recrutments
```

| Parameter     | Type      | Description                                            |
| :------------ | :-------- | :----------------------------------------------------- |
| `id`          | `integer` | **Required**. id of recruitment                        |
| `title`       | `string`  | **Required**. title of recruitment                     |
| `position`    | `string`  | **Required**. position of recruitment                  |
| `number`      | `integer` | **Required**. number of persons needed for recruitment |
| `description` | `string`  | **Required**. Description of recruitment               |
| `candidates`  | `Array`   | candidates applied for recruitment                     |

#### Get one recruitment

```http
  GET /api/recrutments/{id}
```

| Parameter | Type      | Description                     |
| :-------- | :-------- | :------------------------------ |
| `id`      | `integer` | **Required**. id of recruitment |

#### Create recruitment

```http
  POST /api/recrutments
```

| Parameter     | Type      | Description                                            |
| :------------ | :-------- | :----------------------------------------------------- |
| `title`       | `string`  | **Required**. title of recruitment                     |
| `position`    | `string`  | **Required**. position of recruitment                  |
| `number`      | `integer` | **Required**. number of persons needed for recruitment |
| `description` | `string`  | **Required**. Description of recruitment               |

#### Delete recruitment

```http
  DELETE /api/recrutments/{id}
```

| Parameter | Type      | Description                     |
| :-------- | :-------- | :------------------------------ |
| `id`      | `integer` | **Required**. id of recruitment |

#### Get all holidays

```http
  GET /api/holidays
```

| Parameter    | Type      | Description                                    |
| :----------- | :-------- | :--------------------------------------------- |
| `id`         | `integer` | **Required**. id of holiday                    |
| `debut_date` | `date`    | **Required**. Debut date of holiday            |
| `final_date` | `string`  | **Required**. final date of holiday            |
| `user_id`    | `integer` | **Required**. id of user who requested holiday |
| `state`      | `enum`    | **Required**. State of holiday                 |
| `user`       | `object`  | user of holiday                                |

#### Get one holiday

```http
  GET /api/holidays/{id}
```

| Parameter | Type      | Description                 |
| :-------- | :-------- | :-------------------------- |
| `id`      | `integer` | **Required**. id of holiday |

#### Request holiday

```http
  POST /api/holidays
```

| Parameter    | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `debut_date` | `date`   | **Required**. Debut date of holiday |
| `final_date` | `string` | **Required**. final date of holiday |

#### Validate holiday

```http
  POST /api/validateHoliday/{id}
```

| Parameter | Type      | Description                           |
| :-------- | :-------- | :------------------------------------ |
| `id`      | `integer` | **Required**. id of holiday requested |

#### Reject holiday

```http
  POST /api/rejectHoliday/{id}
```

| Parameter | Type      | Description                           |
| :-------- | :-------- | :------------------------------------ |
| `id`      | `integer` | **Required**. id of holiday requested |

#### Delete holiday

```http
  DELETE /api/holidays/{id}
```

| Parameter | Type      | Description                           |
| :-------- | :-------- | :------------------------------------ |
| `id`      | `integer` | **Required**. id of holiday requested |

#### Get all payslips

```http
  GET /api/payslips
```

| Parameter     | Type      | Description                        |
| :------------ | :-------- | :--------------------------------- |
| `id`          | `integer` | **Required**. id of payslip        |
| `ref`         | `string`  | **Required**. Reference of payslip |
| `contract_id` | `integer` | **Required**. id of contract       |
| `contract`    | `object`  | contract of payslip                |

#### Create payslip

```http
  POST /api/payslips
```

| Parameter     | Type      | Description                  |
| :------------ | :-------- | :--------------------------- |
| `contract_id` | `integer` | **Required**. id of contract |

#### Delete payslip

```http
  DELETE /api/payslips/{id}
```

| Parameter | Type      | Description                 |
| :-------- | :-------- | :-------------------------- |
| `id`      | `integer` | **Required**. id of payslip |

#### Get all candidates

```http
  GET /api/candidates
```

| Parameter          | Type      | Description                                              |
| :----------------- | :-------- | :------------------------------------------------------- |
| `id`               | `integer` | **Required**. id of candidate                            |
| `fname`            | `string`  | **Required**. First name of candidate                    |
| `lname`            | `string`  | **Required**. Last name of candidate                     |
| `birthday`         | `string`  | **Required**. Birthday of candidate                      |
| `cin`              | `string`  | **Required**. Cin of candidate                           |
| `img`              | `string`  | **Required**. Image of candidate                         |
| `phone`            | `string`  | **Required**. Phone number of candidate                  |
| `email`            | `string`  | **Required**. Email of candidate                         |
| `cv`               | `string`  | **Required**. Cv of candidate                            |
| `recrutment_id`    | `integer` | **Required**.id of recruitment the candidate applied for |
| `recrutment_state` | `enum`    | **Required**.state of recruitment of the candidate       |
| `recrutment`       | `object`  | info of recruitment that the candidate applied           |

#### Get One candidate

```http
  GET /api/candidates/{id}
```

| Parameter          | Type      | Description                                              |
| :----------------- | :-------- | :------------------------------------------------------- |
| `id`               | `integer` | **Required**. id of candidate                            |
| `fname`            | `string`  | **Required**. First name of candidate                    |
| `lname`            | `string`  | **Required**. Last name of candidate                     |
| `birthday`         | `string`  | **Required**. Birthday of candidate                      |
| `cin`              | `string`  | **Required**. Cin of candidate                           |
| `img`              | `string`  | **Required**. Image of candidate                         |
| `phone`            | `string`  | **Required**. Phone number of candidate                  |
| `email`            | `string`  | **Required**. Email of candidate                         |
| `cv`               | `string`  | **Required**. Cv of candidate                            |
| `recrutment_id`    | `integer` | **Required**.id of recruitment the candidate applied for |
| `recrutment_state` | `enum`    | **Required**.state of recruitment of the candidate       |
| `recrutment`       | `object`  | info of recruitment that the candidate applied           |

#### Apply for recruitment

```http
  POST /api/candidates
```

| Parameter       | Type      | Description                                              |
| :-------------- | :-------- | :------------------------------------------------------- |
| `fname`         | `string`  | **Required**. First name of candidate                    |
| `lname`         | `string`  | **Required**. Last name of candidate                     |
| `birthday`      | `string`  | **Required**. Birthday of candidate                      |
| `cin`           | `string`  | **Required**. Cin of candidate                           |
| `img`           | `string`  | **Required**. Image of candidate                         |
| `phone`         | `string`  | **Required**. Phone number of candidate                  |
| `email`         | `string`  | **Required**. Email of candidate                         |
| `cv`            | `string`  | **Required**. Cv of candidate                            |
| `recrutment_id` | `integer` | **Required**.id of recruitment the candidate applied for |

#### Reject candidate

```http
  DELETE /api/candidates/{id}
```

| Parameter | Type      | Description                   |
| :-------- | :-------- | :---------------------------- |
| `id`      | `integer` | **Required**. id of candidate |

#### Update state recruitment

```http
  POST /api/updateState/{id}
```

| Parameter | Type      | Description                   |
| :-------- | :-------- | :---------------------------- |
| `id`      | `integer` | **Required**. id of candidate |
