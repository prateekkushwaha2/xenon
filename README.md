# XENON

Luxury Jewellery & Cosmetics E-Commerce Platform

XENON is a premium luxury commerce platform built to deliver an elegant shopping experience for jewellery and cosmetic products. The platform combines luxury-focused UI/UX with a modern commerce infrastructure including inventory management, secure payments, order tracking, transactional emails, and an administrative management dashboard.

---

## Overview

XENON was designed with a focus on:

* Luxury-first design language
* Mobile-first shopping experience
* Fast product discovery
* Secure online payments
* Inventory management
* Order lifecycle management
* Premium customer communication

The platform is intended to provide a modern luxury retail experience while remaining lightweight, scalable, and easy to manage.

---

## Features

### Storefront

* Luxury homepage experience
* Featured collections
* Featured products
* Product detail pages
* Collection pages
* Recently viewed products
* Related products
* Responsive mobile experience
* Search and discovery features

### Shopping Experience

* Add to cart
* Quantity management
* Inventory-aware cart controls
* Dynamic checkout
* Razorpay payment integration
* Secure order processing

### Inventory System

* Product inventory management
* Stock deduction after successful order
* Stock limit enforcement
* Out-of-stock prevention
* Real-time stock validation

### Order Management

* Order creation
* Order history storage
* Order item storage
* Tracking ID generation
* Order status workflow

Status flow:

Pending → Packed → Shipped → Delivered

### Tracking System

* Secure tracking IDs
* Customer order tracking
* Delivery progress timeline
* Estimated delivery information

### Email Infrastructure

#### Automatic Emails

* Order confirmation emails
* Tracking ID delivery
* Order summary emails
* Delivery information

#### Manual Emails

Admin-triggered customer notifications:

* Packed
* Shipped
* Delivered
* Custom order updates

### Admin Dashboard

#### Product Management

* Create products
* Delete products
* Product image uploads
* Inventory management
* Featured products

#### Collection Management

* Create collections
* Delete collections
* Homepage visibility controls
* Collection image management

#### Order Management

* View customer orders
* Update order status
* Send customer updates
* Manage fulfillment workflow

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes

### Database

* Supabase

### Authentication & Storage

* Supabase

### Payments

* Razorpay

### Email Service

* Resend

### Deployment

* Vercel

---

## Project Structure

/app
/components
/context
/lib
/api
/public

Key Modules:

* Product Management
* Collection Management
* Cart System
* Checkout System
* Order Management
* Tracking System
* Email System
* Admin Dashboard

---

## Commerce Architecture

Customer Journey

Browse Products

↓

Add To Cart

↓

Checkout

↓

Razorpay Payment

↓

Order Creation

↓

Inventory Update

↓

Confirmation Email

↓

Tracking ID Generated

↓

Order Tracking

↓

Delivery

---

## Security Features

* Tracking ID based order lookup
* Inventory validation
* Stock limitation controls
* Payment verification workflow
* Controlled admin operations

---

## Future Roadmap

### Logistics

* Shiprocket Integration
* Delhivery Integration
* BlueDart Integration
* Live shipment tracking

### Commerce

* Product editing
* Collection editing
* Homepage merchandising controls
* Advanced analytics

### Customer Experience

* Wishlist system
* Customer accounts
* Product reviews
* Personalized recommendations

### Operations

* Advanced inventory controls
* Automated shipment notifications
* Multi-admin support
* Sales reporting

---

## Vision

XENON aims to combine luxury retail aesthetics with modern commerce infrastructure, creating a premium online shopping experience for jewellery and cosmetics customers.

Built with a focus on elegance, reliability, and scalable commerce operations.

