# Loox QA4 - System Under Test (SUT) Overview

## Executive Summary

Loox QA4 is a Shopify app designed for customer review collection and management. The system enables merchants to collect, manage, and display customer reviews with photos and videos, while providing discount incentives and automated review request functionality. The app operates within the Shopify ecosystem and focuses on review collection, management, and display capabilities.

**System Purpose**: Customer review collection and management platform for Shopify merchants  
**Target Users**: Shopify store owners and administrators  
**Primary Functionality**: Review collection, management, display widgets, email automation, and discount management  

## System Architecture & Technology Stack

### Technical Components
- **Platform**: Shopify App (embedded iframe-based application)
- **Frontend**: React-based web application with Polaris UI components
- **Authentication**: Shopify OAuth integration
- **Database**: Cloud-based (likely PostgreSQL/MySQL)
- **Email Service**: Integrated email delivery system
- **File Storage**: Cloud storage for review photos/videos
- **CDN**: Cloudflare integration for content delivery

### System Integration Points
- **Shopify Integration**: Deep integration with Shopify orders, customers, and theme system
- **Email Services**: SMTP/API integration for review request emails
- **Payment Processing**: Shopify payment integration for discount codes
- **Theme Integration**: JavaScript injection for review widgets

## System Modules & Functionality

### 1. Reviews Management Module
**URL**: `/merchant/owRpA393na/reviews`  
**Status**: Currently disabled (requires setup completion)  
**Functionality**:
- Review collection and management
- Photo/video review handling
- Review moderation and publishing
- Review analytics and metrics

### 2. Settings Module
**URL**: `/merchant/owRpA393na/settings`  
**Status**: Active and accessible  

#### 2.1 Branding Settings
**URL**: `/merchant/owRpA393na/settings/branding`  
**Features**:
- Logo upload and management
- Style customization (star ratings, colors)
- Corner style options (Sharp, Slightly rounded, Rounded, Extra rounded)
- Font selection (Default Poppins)
- Hide Loox branding option
- Color customization (#EBBF20 default)

#### 2.2 Orders Settings
**URL**: `/merchant/owRpA393na/settings/orders`  
**Features**:
- Order search and filtering
- Order status management
- Review request tracking
- Order analytics dashboard
- Filter options: All orders, Sent, Scheduled/Pending fulfillment, Review received, Blocked from Loox emails, Cancelled

#### 2.3 Email Settings
**URL**: `/merchant/owRpA393na/settings/general/email`  
**Features**:
- Email customization and branding
- Email replies address configuration
- Email compliance settings
- Unsubscribe management
- Marketing consent handling
- Transactional email settings
- Order exclusion tags (0/100 tags limit)

#### 2.4 General Settings Sub-modules
- **Localization**: `/merchant/owRpA393na/settings/general/localization`
- **External Domains**: `/merchant/owRpA393na/settings/general/external-domains`
- **Theme Integration**: `/merchant/owRpA393na/settings/general/add-loox-to-your-theme`
- **Plan Management**: `/merchant/owRpA393na/settings/general/plan`

#### 2.5 Integrations Settings
**URL**: `/merchant/owRpA393na/settings/integrations`  
**Status**: Available but out of scope for testing

### 3. Referrals Module
**URL**: `/merchant/owRpA393na/referrals`  
**Status**: Currently disabled  
**Features** (based on dashboard):
- Advocate management
- Referral tracking
- Revenue analytics
- Program setup and configuration

### 4. Upsell Module
**URL**: `/merchant/owRpA393na/upsell`  
**Status**: Currently disabled  
**Features** (based on dashboard):
- Upsell activation
- Impression tracking
- Revenue analytics
- Product recommendation management

## User Roles & Access Control

### Primary User Role: Merchant Administrator
- **Access Level**: Full administrative access to all Loox features
- **Permissions**: 
  - Review management and moderation
  - Settings configuration
  - Email template customization
  - Analytics and reporting access
  - Plan management and upgrades

### Authentication & Authorization
- **Authentication Method**: Shopify OAuth integration
- **Session Management**: Shopify-managed sessions
- **Access Control**: Role-based permissions through Shopify
- **Security**: HTTPS encryption, secure token handling

## Data Management & Storage

### Core Data Entities
1. **Reviews**
   - Review text content
   - Star ratings (1-5 scale)
   - Photo/video attachments
   - Customer information
   - Product associations
   - Publication status

2. **Orders**
   - Order tracking and status
   - Customer email addresses
   - Review request status
   - Fulfillment tracking

3. **Settings**
   - Branding configurations
   - Email templates
   - Discount settings
   - Theme customizations

### Data Relationships
- Reviews linked to specific orders
- Orders linked to customer email addresses
- Settings applied globally to all review requests
- Product groups for review organization

## User Interface & User Experience

### Navigation Structure
- **Main Navigation**: Home, Orders, Products, Customers, Marketing, Discounts, Content, Markets, Finance, Analytics
- **Loox App Navigation**: Reviews, Referrals, Upsell, Settings
- **Settings Sub-navigation**: Branding, Orders, Integrations, General (with sub-items)

### UI Components
- **Framework**: Shopify Polaris design system
- **Layout**: Iframe-based embedded application
- **Responsive Design**: Mobile and desktop optimized
- **Accessibility**: ARIA-compliant navigation and controls

### Key UI Elements
- Dashboard with performance metrics
- Form controls for settings configuration
- Data tables for order management
- File upload interfaces for branding
- Color pickers and style selectors

## Business Processes & Workflows

### 1. Review Collection Workflow
1. Customer makes purchase
2. Order fulfillment triggers review request
3. Email sent to customer with review link
4. Customer submits review (text, photo, video)
5. Review moderation and approval
6. Review published to storefront

### 2. Discount Management Workflow
1. Configure discount settings
2. Set discount amounts based on review type
3. Automatic discount code generation
4. Discount application upon review submission

### 3. Email Customization Workflow
1. Access email settings
2. Customize email templates
3. Configure branding elements
4. Set compliance and consent rules
5. Test and deploy email changes

## Integration Points & External Systems

### Shopify Integration
- **Orders API**: Order data retrieval and status tracking
- **Customers API**: Customer information and consent management
- **Theme API**: Widget injection and customization
- **Discount API**: Discount code creation and management

### External Services
- **Email Delivery**: SMTP/API integration for review requests
- **File Storage**: Cloud storage for review media
- **CDN Services**: Content delivery for review widgets
- **Analytics**: Performance tracking and reporting

## Security Features

### Data Protection
- **Encryption**: HTTPS for all communications
- **Data Privacy**: GDPR compliance features
- **Consent Management**: Marketing consent tracking
- **Access Control**: Role-based permissions

### Email Security
- **Compliance**: Email compliance settings
- **Unsubscribe Management**: Automatic unsubscribe handling
- **Consent Tracking**: Marketing consent verification

## Performance Characteristics

### Current System State
- **Reviews**: 0 review requests sent, 0 reviews collected, 0 photo/video reviews
- **Referrals**: 0 advocates, 0 visits, 0 orders, $3.4K referrals-generated revenue
- **Upsells**: 0 impressions, 0 upsells, $0 upsells-generated revenue

### Performance Metrics
- **Dashboard Analytics**: 30-day performance tracking
- **Revenue Tracking**: Reviews, referrals, and upsells revenue
- **Engagement Metrics**: Review collection rates and customer participation

## Test Environment Information

### Access Credentials
- **Username**: slavastinov@gmail.com
- **Password**: ybPZ4D!nD/R*^3v
- **Shopify Dashboard**: https://admin.shopify.com/store/istqb5-qa4/
- **Loox App URL**: https://admin.shopify.com/store/istqb5-qa4/apps/loox-qa4/merchant/owRpA393na/homepage

### Test Data
- **Payment Test Card**: 1 (Security: 123, Year: 12/2008, Any name)
- **Current Plan**: Basic setup with limited functionality
- **System State**: Fresh installation with no existing reviews

### Environment Characteristics
- **Setup Status**: 2/3 completed (Core script and widgets setup pending)
- **Data State**: Empty system with no reviews or customer data
- **Configuration**: Default settings with minimal customization

## Risk Assessment & Critical Areas

### High Risk Areas
1. **Review Collection Process**: Core functionality for review gathering
2. **Email Delivery System**: Critical for customer engagement
3. **Discount Management**: Financial impact on merchant operations
4. **Data Privacy Compliance**: Legal and regulatory requirements

### Medium Risk Areas
1. **Branding Customization**: User experience and brand consistency
2. **Order Management**: Integration with Shopify order system
3. **Settings Configuration**: System behavior and functionality

### Low Risk Areas
1. **Analytics Dashboard**: Reporting and metrics display
2. **UI Navigation**: User interface interactions
3. **File Upload**: Logo and media management

## Compliance & Standards

### Regulatory Compliance
- **GDPR**: Marketing consent management and data privacy
- **Email Compliance**: Unsubscribe handling and consent tracking
- **Data Protection**: Secure handling of customer information

### Business Standards
- **Shopify App Standards**: Compliance with Shopify app requirements
- **Email Marketing**: Compliance with email marketing regulations
- **Accessibility**: ARIA-compliant user interface

## Test Preparation Data

### Test Scenarios Required
1. **Review Collection Testing**: End-to-end review submission process
2. **Email Testing**: Review request email delivery and customization
3. **Discount Testing**: Discount code generation and application
4. **Settings Testing**: Configuration changes and persistence
5. **Integration Testing**: Shopify order and customer data integration

### Test Data Requirements
- **Customer Orders**: Test orders for review request simulation
- **Email Addresses**: Test email addresses for review request delivery
- **Product Data**: Test products for review association
- **Media Files**: Test images and videos for review attachments

### Environment Setup
- **Core Script Installation**: Enable Loox core script on Shopify theme
- **Widget Configuration**: Set up review display widgets
- **Email Configuration**: Configure email templates and settings
- **Discount Setup**: Configure discount amounts and conditions

## Product Owner Scope Definition

### IN SCOPE - Reviews Functionality
**Main Scope: Reviews**
- Manage Reviews / Store Reviews
- Reviews Widgets
- Email Editors
- Manual Request
- Review Form & Custom Questions
- Discounts
- Publishing Reviews
- Preview Link & QR Code
- Product Groups
- Reviews Settings

### IN SCOPE - Settings Functionality
**Settings Scope:**
- Branding
- Email Settings
- Add Loox To Your Theme
- Manual Request
- Orders
- Localization
- Preview Link & QR Code
- Loox Plan - Upgrade & Downgrade

### OUT OF SCOPE
**Explicitly Out of Scope:**
- IMPORT REVIEWS
- INTEGRATIONS
- REFERRALS
- UPSELL
- SEO
- Ext DOMAINS

## Recommendations for Testing

### Testing Priorities
1. **Critical Path Testing**: Review collection and management workflow
2. **Integration Testing**: Shopify API integration and data synchronization
3. **Email Testing**: Review request delivery and customization
4. **Security Testing**: Data privacy and consent management
5. **Performance Testing**: System responsiveness and scalability

### Testing Approach
- **Functional Testing**: Core feature validation
- **Integration Testing**: Shopify ecosystem integration
- **User Acceptance Testing**: Merchant workflow validation
- **Security Testing**: Data protection and compliance
- **Performance Testing**: System load and response times

### Test Environment Setup
- **Data Preparation**: Create test orders and customer data
- **Configuration**: Set up complete system configuration
- **Integration**: Verify Shopify API connectivity
- **Monitoring**: Implement test result tracking and reporting

---

**Document Version**: 1.0  
**Created**: January 2025  
**Last Updated**: January 2025  
**Purpose**: Comprehensive SUT Overview for Loox QA4 testing  
**Dependencies**: Shopify integration, Playwright MCP browser automation  
**Scope**: Loox QA4 app functionality (Shopify platform out of scope)




