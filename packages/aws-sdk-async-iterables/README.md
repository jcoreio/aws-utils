# @jcoreio/aws-sdk-async-iterables

async iterable wrappers for AWS SDKs

# Overview

Pagination sucks. Every time you implement a pagination loop you lose a brain cell.
Use async iterable wrappers so that you don't lose any more brain cells.

Right now there are only wrappers for the methods listed below. I'll add wrappers to this package as I need them.

# Table of Contents

<!-- toc -->

- [API](#api)
  - [CloudFormation](#cloudformation)
    - [`describeStackEvents`](#describestackevents)
    - [`describeStacks`](#describestacks)
    - [`listChangeSets`](#listchangesets)
    - [`listExports`](#listexports)
    - [`listImports`](#listimports)
    - [`listStackInstances`](#liststackinstances)
    - [`listStackResources`](#liststackresources)
    - [`listStacks`](#liststacks)
    - [`listStackSetOperationResults`](#liststacksetoperationresults)
    - [`listStackSetOperations`](#liststacksetoperations)
    - [`listStackSets`](#liststacksets)
    - [`listTypeRegistrations`](#listtyperegistrations)
    - [`listTypes`](#listtypes)
    - [`listTypeVersions`](#listtypeversions)
  - [EC2](#ec2)
    - [`describeByoipCidrs`](#describebyoipcidrs)
    - [`describeCapacityReservations`](#describecapacityreservations)
    - [`describeClassicLinkInstances`](#describeclassiclinkinstances)
    - [`describeClientVpnAuthorizationRules`](#describeclientvpnauthorizationrules)
    - [`describeClientVpnConnections`](#describeclientvpnconnections)
    - [`describeClientVpnEndpoints`](#describeclientvpnendpoints)
    - [`describeClientVpnRoutes`](#describeclientvpnroutes)
    - [`describeClientVpnTargetNetworks`](#describeclientvpntargetnetworks)
    - [`describeCoipPools`](#describecoippools)
    - [`describeDhcpOptions`](#describedhcpoptions)
    - [`describeEgressOnlyInternetGateways`](#describeegressonlyinternetgateways)
    - [`describeElasticGpus`](#describeelasticgpus)
    - [`describeExportImageTasks`](#describeexportimagetasks)
    - [`describeFastSnapshotRestores`](#describefastsnapshotrestores)
    - [`describeFleetHistory`](#describefleethistory)
    - [`describeFleetInstances`](#describefleetinstances)
    - [`describeFleets`](#describefleets)
    - [`describeFlowLogs`](#describeflowlogs)
    - [`describeFpgaImages`](#describefpgaimages)
    - [`describeHostReservationOfferings`](#describehostreservationofferings)
    - [`describeHostReservations`](#describehostreservations)
    - [`describeHosts`](#describehosts)
    - [`describeIamInstanceProfileAssociations`](#describeiaminstanceprofileassociations)
    - [`describeImportImageTasks`](#describeimportimagetasks)
    - [`describeImportSnapshotTasks`](#describeimportsnapshottasks)
    - [`describeInstanceCreditSpecifications`](#describeinstancecreditspecifications)
    - [`describeInstances`](#describeinstances)
    - [`describeInstanceTypeOfferings`](#describeinstancetypeofferings)
    - [`describeInstanceTypes`](#describeinstancetypes)
    - [`describeInternetGateways`](#describeinternetgateways)
    - [`describeLaunchTemplates`](#describelaunchtemplates)
    - [`describeLaunchTemplateVersions`](#describelaunchtemplateversions)
    - [`describeLocalGatewayRouteTables`](#describelocalgatewayroutetables)
    - [`describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations`](#describelocalgatewayroutetablevirtualinterfacegroupassociations)
    - [`describeLocalGatewayRouteTableVpcAssociations`](#describelocalgatewayroutetablevpcassociations)
    - [`describeLocalGateways`](#describelocalgateways)
    - [`describeLocalGatewayVirtualInterfaceGroups`](#describelocalgatewayvirtualinterfacegroups)
    - [`describeLocalGatewayVirtualInterfaces`](#describelocalgatewayvirtualinterfaces)
    - [`describeNatGateways`](#describenatgateways)
    - [`describeNetworkAcls`](#describenetworkacls)
    - [`describeNetworkInterfacePermissions`](#describenetworkinterfacepermissions)
    - [`describeNetworkInterfaces`](#describenetworkinterfaces)
    - [`describePrefixLists`](#describeprefixlists)
    - [`describePrincipalIdFormat`](#describeprincipalidformat)
    - [`describePublicIpv4Pools`k](#describepublicipv4pools)
    - [`describeReservedInstancesModifications`](#describereservedinstancesmodifications)
    - [`describeReservedInstancesOfferings`](#describereservedinstancesofferings)
    - [`describeRouteTables`](#describeroutetables)
    - [`describeScheduledInstanceAvailability`](#describescheduledinstanceavailability)
    - [`describeScheduledInstances`](#describescheduledinstances)
    - [`describeSecurityGroups`](#describesecuritygroups)
    - [`describeSnapshots`](#describesnapshots)
    - [`describeSpotFleetInstances`](#describespotfleetinstances)
    - [`describeSpotFleetRequestHistory`](#describespotfleetrequesthistory)
    - [`describeSpotFleetRequests`](#describespotfleetrequests)
    - [`describeSpotInstanceRequests`](#describespotinstancerequests)
    - [`describeSpotPriceHistory`](#describespotpricehistory)
    - [`describeStaleSecurityGroups`](#describestalesecuritygroups)
    - [`describeSubnets`](#describesubnets)
    - [`describeTags`](#describetags)
    - [`describeTrafficMirrorFilters`](#describetrafficmirrorfilters)
    - [`describeTrafficMirrorSessions`](#describetrafficmirrorsessions)
    - [`describeTrafficMirrorTargets`](#describetrafficmirrortargets)
    - [`describeTransitGatewayAttachments`](#describetransitgatewayattachments)
    - [`describeTransitGatewayMulticastDomains`](#describetransitgatewaymulticastdomains)
    - [`describeTransitGatewayPeeringAttachments`](#describetransitgatewaypeeringattachments)
    - [`describeTransitGatewayRouteTables`](#describetransitgatewayroutetables)
    - [`describeTransitGateways`](#describetransitgateways)
    - [`describeTransitGatewayVpcAttachments`](#describetransitgatewayvpcattachments)
    - [`describeVolumes`](#describevolumes)
    - [`describeVolumesModifications`](#describevolumesmodifications)
    - [`describeVolumeStatus`](#describevolumestatus)
    - [`describeVpcClassicLinkDnsSupport`](#describevpcclassiclinkdnssupport)
    - [`describeVpcEndpointConnectionNotifications`](#describevpcendpointconnectionnotifications)
    - [`describeVpcEndpointConnections`](#describevpcendpointconnections)
    - [`describeVpcEndpoints`](#describevpcendpoints)
    - [`describeVpcEndpointServiceConfigurations`](#describevpcendpointserviceconfigurations)
    - [`describeVpcEndpointServicePermissions`](#describevpcendpointservicepermissions)
    - [`describeVpcEndpointServices`](#describevpcendpointservices)
    - [`describeVpcPeeringConnections`](#describevpcpeeringconnections)
    - [`describeVpcs`](#describevpcs)
  - [ECS](#ecs)
    - [`describeCapacityProviders`](#describecapacityproviders)
    - [`describeClusters`](#describeclusters)
    - [`describeContainerInstances`](#describecontainerinstances)
    - [`describeServices`](#describeservices)
    - [`describeTasks`](#describetasks)
    - [`describeTaskSets`](#describetasksets)
    - [`listAccountSettings`](#listaccountsettings)
    - [`listClusters`](#listclusters)
    - [`listContainerInstances`](#listcontainerinstances)
    - [`listServices`](#listservices)
    - [`listTaskDefinitionFamilies`](#listtaskdefinitionfamilies)
    - [`listTaskDefinitions`](#listtaskdefinitions)
    - [`listTasks`](#listtasks)
  - [S3](#s3)
    - [`listObjectsV2`](#listobjectsv2)
    - [`deleteObjects`](#deleteobjects)
    - [`listAndDeleteObjects`](#listanddeleteobjects)

<!-- tocstop -->

# API

## CloudFormation

```ts
import { CloudFormation } from '@jcoreio/aws-sdk-async-iterables'
```

### `describeStackEvents`

```ts
export async function* describeStackEvents(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStackEventsInput
): AsyncIterable<AWS.CloudFormation.StackEvent>
```

### `describeStacks`

```ts
export async function* describeStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.DescribeStacksInput
): AsyncIterable<AWS.CloudFormation.Stack>
```

### `listChangeSets`

```ts
export async function* listChangeSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListChangeSetsInput
): AsyncIterable<AWS.CloudFormation.ChangeSetSummary>
```

### `listExports`

```ts
export async function* listExports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListExportsInput
): AsyncIterable<AWS.CloudFormation.Export>
```

### `listImports`

```ts
export async function* listImports(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListImportsInput
): AsyncIterable<AWS.CloudFormation.Imports[number]>
```

### `listStackInstances`

```ts
export async function* listStackInstances(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackInstancesInput
): AsyncIterable<AWS.CloudFormation.StackInstanceSummary>
```

### `listStackResources`

```ts
export async function* listStackResources(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackResourcesInput
): AsyncIterable<AWS.CloudFormation.StackResourceSummary>
```

### `listStacks`

```ts
export async function* listStacks(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStacksInput
): AsyncIterable<AWS.CloudFormation.StackSummary>
```

### `listStackSetOperationResults`

```ts
export async function* listStackSetOperationResults(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationResultsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationResultSummary>
```

### `listStackSetOperations`

```ts
export async function* listStackSetOperations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetOperationsInput
): AsyncIterable<AWS.CloudFormation.StackSetOperationSummary>
```

### `listStackSets`

```ts
export async function* listStackSets(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListStackSetsInput
): AsyncIterable<AWS.CloudFormation.StackSetSummary>
```

### `listTypeRegistrations`

```ts
export async function* listTypeRegistrations(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeRegistrationsInput
): AsyncIterable<AWS.CloudFormation.RegistrationToken>
```

### `listTypes`

```ts
export async function* listTypes(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypesInput
): AsyncIterable<AWS.CloudFormation.TypeSummary>
```

### `listTypeVersions`

```ts
export async function* listTypeVersions(
  cloudformation: AWS.CloudFormation,
  params: AWS.CloudFormation.ListTypeVersionsInput
): AsyncIterable<AWS.CloudFormation.TypeVersionSummary>
```

## EC2

```js
import { EC2 } from '@jcoreio/aws-sdk-async-iterables'
```

### `describeByoipCidrs`

```ts
export async function* describeByoipCidrs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeByoipCidrsRequest
): AsyncIterable<AWS.EC2.ByoipCidr>
```

### `describeCapacityReservations`

```ts
export async function* describeCapacityReservations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeCapacityReservationsRequest
): AsyncIterable<AWS.EC2.CapacityReservation>
```

### `describeClassicLinkInstances`

```ts
export async function* describeClassicLinkInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClassicLinkInstancesRequest
): AsyncIterable<AWS.EC2.ClassicLinkInstance>
```

### `describeClientVpnAuthorizationRules`

```ts
export async function* describeClientVpnAuthorizationRules(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnAuthorizationRulesRequest
): AsyncIterable<AWS.EC2.AuthorizationRule>
```

### `describeClientVpnConnections`

```ts
export async function* describeClientVpnConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnConnectionsRequest
): AsyncIterable<AWS.EC2.ClientVpnConnection>
```

### `describeClientVpnEndpoints`

```ts
export async function* describeClientVpnEndpoints(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnEndpointsRequest
): AsyncIterable<AWS.EC2.ClientVpnEndpoint>
```

### `describeClientVpnRoutes`

```ts
export async function* describeClientVpnRoutes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnRoutesRequest
): AsyncIterable<AWS.EC2.ClientVpnRoute>
```

### `describeClientVpnTargetNetworks`

```ts
export async function* describeClientVpnTargetNetworks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnTargetNetworksRequest
): AsyncIterable<AWS.EC2.TargetNetwork>
```

### `describeCoipPools`

```ts
export async function* describeCoipPools(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeCoipPoolsRequest
): AsyncIterable<AWS.EC2.CoipPool>
```

### `describeDhcpOptions`

```ts
export async function* describeDhcpOptions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeDhcpOptionsRequest
): AsyncIterable<AWS.EC2.DhcpOptions>
```

### `describeEgressOnlyInternetGateways`

```ts
export async function* describeEgressOnlyInternetGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeEgressOnlyInternetGatewaysRequest
): AsyncIterable<AWS.EC2.EgressOnlyInternetGateway>
```

### `describeElasticGpus`

```ts
export async function* describeElasticGpus(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeElasticGpusRequest
): AsyncIterable<AWS.EC2.ElasticGpus>
```

### `describeExportImageTasks`

```ts
export async function* describeExportImageTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeExportImageTasksRequest
): AsyncIterable<AWS.EC2.ExportImageTask>
```

### `describeFastSnapshotRestores`

```ts
export async function* describeFastSnapshotRestores(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFastSnapshotRestoresRequest
): AsyncIterable<AWS.EC2.DescribeFastSnapshotRestoreSuccessItem>
```

### `describeFleetHistory`

```ts
export async function* describeFleetHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetHistoryRequest
): AsyncIterable<AWS.EC2.HistoryRecordEntry>
```

### `describeFleetInstances`

```ts
export async function* describeFleetInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetInstancesRequest
): AsyncIterable<AWS.EC2.ActiveInstance>
```

### `describeFleets`

```ts
export async function* describeFleets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetsRequest
): AsyncIterable<AWS.EC2.FleetData>
```

### `describeFlowLogs`

```ts
export async function* describeFlowLogs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFlowLogsRequest
): AsyncIterable<AWS.EC2.FlowLog>
```

### `describeFpgaImages`

```ts
export async function* describeFpgaImages(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFpgaImagesRequest
): AsyncIterable<AWS.EC2.FpgaImage>
```

### `describeHostReservationOfferings`

```ts
export async function* describeHostReservationOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostReservationOfferingsRequest
): AsyncIterable<AWS.EC2.HostOffering>
```

### `describeHostReservations`

```ts
export async function* describeHostReservations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostReservationsRequest
): AsyncIterable<AWS.EC2.HostReservation>
```

### `describeHosts`

```ts
export async function* describeHosts(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostsRequest
): AsyncIterable<AWS.EC2.Host>
```

### `describeIamInstanceProfileAssociations`

```ts
export async function* describeIamInstanceProfileAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeIamInstanceProfileAssociationsRequest
): AsyncIterable<AWS.EC2.IamInstanceProfileAssociation>
```

### `describeImportImageTasks`

```ts
export async function* describeImportImageTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeImportImageTasksRequest
): AsyncIterable<AWS.EC2.ImportImageTask>
```

### `describeImportSnapshotTasks`

```ts
export async function* describeImportSnapshotTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeImportSnapshotTasksRequest
): AsyncIterable<AWS.EC2.ImportSnapshotTask>
```

### `describeInstanceCreditSpecifications`

```ts
export async function* describeInstanceCreditSpecifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceCreditSpecificationsRequest
): AsyncIterable<AWS.EC2.InstanceCreditSpecification>
```

### `describeInstances`

```ts
export async function* describeInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstancesRequest
): AsyncIterable<AWS.EC2.Reservation>
```

### `describeInstanceTypeOfferings`

```ts
export async function* describeInstanceTypeOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceTypeOfferingsRequest
): AsyncIterable<AWS.EC2.InstanceTypeOffering>
```

### `describeInstanceTypes`

```ts
export async function* describeInstanceTypes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceTypesRequest
): AsyncIterable<AWS.EC2.InstanceTypeInfo>
```

### `describeInternetGateways`

```ts
export async function* describeInternetGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInternetGatewaysRequest
): AsyncIterable<AWS.EC2.InternetGateway>
```

### `describeLaunchTemplates`

```ts
export async function* describeLaunchTemplates(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLaunchTemplatesRequest
): AsyncIterable<AWS.EC2.LaunchTemplate>
```

### `describeLaunchTemplateVersions`

```ts
export async function* describeLaunchTemplateVersions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLaunchTemplateVersionsRequest
): AsyncIterable<AWS.EC2.LaunchTemplateVersion>
```

### `describeLocalGatewayRouteTables`

```ts
export async function* describeLocalGatewayRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTablesRequest
): AsyncIterable<AWS.EC2.LocalGatewayRouteTable>
```

### `describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations`

```ts
export async function* describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsRequest
): AsyncIterable<AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation>
```

### `describeLocalGatewayRouteTableVpcAssociations`

```ts
export async function* describeLocalGatewayRouteTableVpcAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTableVpcAssociationsRequest
): AsyncIterable<AWS.EC2.LocalGatewayRouteTableVpcAssociation>
```

### `describeLocalGateways`

```ts
export async function* describeLocalGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewaysRequest
): AsyncIterable<AWS.EC2.LocalGateway>
```

### `describeLocalGatewayVirtualInterfaceGroups`

```ts
export async function* describeLocalGatewayVirtualInterfaceGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayVirtualInterfaceGroupsRequest
): AsyncIterable<AWS.EC2.LocalGatewayVirtualInterfaceGroup>
```

### `describeLocalGatewayVirtualInterfaces`

```ts
export async function* describeLocalGatewayVirtualInterfaces(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayVirtualInterfacesRequest
): AsyncIterable<AWS.EC2.LocalGatewayVirtualInterface>
```

### `describeNatGateways`

```ts
export async function* describeNatGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNatGatewaysRequest
): AsyncIterable<AWS.EC2.NatGateway>
```

### `describeNetworkAcls`

```ts
export async function* describeNetworkAcls(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkAclsRequest
): AsyncIterable<AWS.EC2.NetworkAcl>
```

### `describeNetworkInterfacePermissions`

```ts
export async function* describeNetworkInterfacePermissions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkInterfacePermissionsRequest
): AsyncIterable<AWS.EC2.NetworkInterfacePermission>
```

### `describeNetworkInterfaces`

```ts
export async function* describeNetworkInterfaces(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkInterfacesRequest
): AsyncIterable<AWS.EC2.NetworkInterface>
```

### `describePrefixLists`

```ts
export async function* describePrefixLists(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePrefixListsRequest
): AsyncIterable<AWS.EC2.PrefixList>
```

### `describePrincipalIdFormat`

```ts
export async function* describePrincipalIdFormat(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePrincipalIdFormatRequest
): AsyncIterable<AWS.EC2.PrincipalIdFormat>
```

### `describePublicIpv4Pools`

```ts
export async function* describePublicIpv4Pools(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePublicIpv4PoolsRequest
): AsyncIterable<AWS.EC2.PublicIpv4Pool>
```

### `describeReservedInstancesModifications`

```ts
export async function* describeReservedInstancesModifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeReservedInstancesModificationsRequest
): AsyncIterable<AWS.EC2.ReservedInstancesModification>
```

### `describeReservedInstancesOfferings`

```ts
export async function* describeReservedInstancesOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeReservedInstancesOfferingsRequest
): AsyncIterable<AWS.EC2.ReservedInstancesOffering>
```

### `describeRouteTables`

```ts
export async function* describeRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeRouteTablesRequest
): AsyncIterable<AWS.EC2.RouteTable>
```

### `describeScheduledInstanceAvailability`

```ts
export async function* describeScheduledInstanceAvailability(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeScheduledInstanceAvailabilityRequest
): AsyncIterable<AWS.EC2.ScheduledInstanceAvailability>
```

### `describeScheduledInstances`

```ts
export async function* describeScheduledInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeScheduledInstancesRequest
): AsyncIterable<AWS.EC2.ScheduledInstance>
```

### `describeSecurityGroups`

```ts
export async function* describeSecurityGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSecurityGroupsRequest
): AsyncIterable<AWS.EC2.SecurityGroup>
```

### `describeSnapshots`

```ts
export async function* describeSnapshots(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSnapshotsRequest
): AsyncIterable<AWS.EC2.Snapshot>
```

### `describeSpotFleetInstances`

```ts
export async function* describeSpotFleetInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetInstancesRequest
): AsyncIterable<AWS.EC2.ActiveInstance>
```

### `describeSpotFleetRequestHistory`

```ts
export async function* describeSpotFleetRequestHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetRequestHistoryRequest
): AsyncIterable<AWS.EC2.HistoryRecord>
```

### `describeSpotFleetRequests`

```ts
export async function* describeSpotFleetRequests(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetRequestsRequest
): AsyncIterable<AWS.EC2.SpotFleetRequestConfig>
```

### `describeSpotInstanceRequests`

```ts
export async function* describeSpotInstanceRequests(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotInstanceRequestsRequest
): AsyncIterable<AWS.EC2.SpotInstanceRequest>
```

### `describeSpotPriceHistory`

```ts
export async function* describeSpotPriceHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotPriceHistoryRequest
): AsyncIterable<AWS.EC2.SpotPrice>
```

### `describeStaleSecurityGroups`

```ts
export async function* describeStaleSecurityGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeStaleSecurityGroupsRequest
): AsyncIterable<AWS.EC2.StaleSecurityGroup>
```

### `describeSubnets`

```ts
export async function* describeSubnets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSubnetsRequest
): AsyncIterable<AWS.EC2.Subnet>
```

### `describeTags`

```ts
export async function* describeTags(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTagsRequest
): AsyncIterable<AWS.EC2.Tag>
```

### `describeTrafficMirrorFilters`

```ts
export async function* describeTrafficMirrorFilters(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorFiltersRequest
): AsyncIterable<AWS.EC2.TrafficMirrorFilter>
```

### `describeTrafficMirrorSessions`

```ts
export async function* describeTrafficMirrorSessions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorSessionsRequest
): AsyncIterable<AWS.EC2.TrafficMirrorSession>
```

### `describeTrafficMirrorTargets`

```ts
export async function* describeTrafficMirrorTargets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorTargetsRequest
): AsyncIterable<AWS.EC2.TrafficMirrorTarget>
```

### `describeTransitGatewayAttachments`

```ts
export async function* describeTransitGatewayAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayAttachment>
```

### `describeTransitGatewayMulticastDomains`

```ts
export async function* describeTransitGatewayMulticastDomains(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayMulticastDomainsRequest
): AsyncIterable<AWS.EC2.TransitGatewayMulticastDomain>
```

### `describeTransitGatewayPeeringAttachments`

```ts
export async function* describeTransitGatewayPeeringAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayPeeringAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayPeeringAttachment>
```

### `describeTransitGatewayRouteTables`

```ts
export async function* describeTransitGatewayRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayRouteTablesRequest
): AsyncIterable<AWS.EC2.TransitGatewayRouteTable>
```

### `describeTransitGateways`

```ts
export async function* describeTransitGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewaysRequest
): AsyncIterable<AWS.EC2.TransitGateway>
```

### `describeTransitGatewayVpcAttachments`

```ts
export async function* describeTransitGatewayVpcAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayVpcAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayVpcAttachment>
```

### `describeVolumes`

```ts
export async function* describeVolumes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumesRequest
): AsyncIterable<AWS.EC2.Volume>
```

### `describeVolumesModifications`

```ts
export async function* describeVolumesModifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumesModificationsRequest
): AsyncIterable<AWS.EC2.VolumeModification>
```

### `describeVolumeStatus`

```ts
export async function* describeVolumeStatus(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumeStatusRequest
): AsyncIterable<AWS.EC2.VolumeStatusItem>
```

### `describeVpcClassicLinkDnsSupport`

```ts
export async function* describeVpcClassicLinkDnsSupport(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcClassicLinkDnsSupportRequest
): AsyncIterable<AWS.EC2.ClassicLinkDnsSupport>
```

### `describeVpcEndpointConnectionNotifications`

```ts
export async function* describeVpcEndpointConnectionNotifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointConnectionNotificationsRequest
): AsyncIterable<AWS.EC2.ConnectionNotification>
```

### `describeVpcEndpointConnections`

```ts
export async function* describeVpcEndpointConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointConnectionsRequest
): AsyncIterable<AWS.EC2.VpcEndpointConnection>
```

### `describeVpcEndpoints`

```ts
export async function* describeVpcEndpoints(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointsRequest
): AsyncIterable<AWS.EC2.VpcEndpoint>
```

### `describeVpcEndpointServiceConfigurations`

```ts
export async function* describeVpcEndpointServiceConfigurations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointServiceConfigurationsRequest
): AsyncIterable<AWS.EC2.ServiceConfiguration>
```

### `describeVpcEndpointServicePermissions`

```ts
export async function* describeVpcEndpointServicePermissions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointServicePermissionsRequest
): AsyncIterable<AWS.EC2.AllowedPrincipal>
```

### `describeVpcEndpointServices`

```ts
export async function* describeVpcEndpointServices(
  ec2: AWS.EC2,

  params: AWS.EC2.DescribeVpcEndpointServicesRequest
): AsyncIterable<AWS.EC2.ServiceDetail>
```

### `describeVpcPeeringConnections`

```ts
export async function* describeVpcPeeringConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcPeeringConnectionsRequest
): AsyncIterable<AWS.EC2.VpcPeeringConnection>
```

### `describeVpcs`

```ts
export async function* describeVpcs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcsRequest
): AsyncIterable<AWS.EC2.Vpc>
```

## ECS

```js
import { ECS } from '@jcoreio/aws-sdk-async-iterables'
```

The `describe` methods accept sync/async iterables of ARNs to describe
in places of just arrays. This means you can pipe the `AsyncIterable`s
returned by `list` methods into them:

```ts
async function go() {
  for await (const taskOrFailure of ECS.describeTasks(ecs, {
    cluster: 'mycluster',
    tasks: ECS.listTasks(ecs, { cluster: 'mycluster' }),
  })) {
    console.log(taskOrFailure)
  }
}
```

The `describe` methods yield both descriptions and failures; if
you don't want the failures wrap the function in `skipFailures`:

```ts
async function go() {
  for await (const task of ECS.skipFailures(ECS.describeTasks)(ecs, {
    tasks: ECS.listTasks(ecs, { cluster: 'mycluster' }),
  })) {
    console.log(task)
  }
}
```

### `describeCapacityProviders`

```ts
export async function* describeCapacityProviders(
  ecs: AWS.ECS,
  params: DescribeCapacityProvidersRequest
): AsyncIterable<AWS.ECS.CapacityProvider | AWS.ECS.Failure>
```

### `describeClusters`

```ts
export async function* describeClusters(
  ecs: AWS.ECS,
  params: DescribeClustersRequest
): AsyncIterable<AWS.ECS.Cluster | AWS.ECS.Failure>
```

### `describeContainerInstances`

```ts
export async function* describeContainerInstances(
  ecs: AWS.ECS,
  params: DescribeContainerInstancesRequest
): AsyncIterable<AWS.ECS.ContainerInstance | AWS.ECS.Failure>
```

### `describeServices`

```ts
export async function* describeServices(
  ecs: AWS.ECS,
  params: DescribeServicesRequest
): AsyncIterable<AWS.ECS.Service | AWS.ECS.Failure>
```

### `describeTasks`

```ts
export async function* describeTasks(
  ecs: AWS.ECS,
  params: DescribeTasksRequest
): AsyncIterable<AWS.ECS.Task | AWS.ECS.Failure>
```

### `describeTaskSets`

```ts
export async function* describeTaskSets(
  ecs: AWS.ECS,
  params: DescribeTaskSetsRequest
): AsyncIterable<AWS.ECS.TaskSet | AWS.ECS.Failure>
```

### `listAccountSettings`

```ts
export async function* listAccountSettings(
  ecs: AWS.ECS,
  params: AWS.ECS.ListAccountSettingsRequest
): AsyncIterable<AWS.ECS.Setting>
```

### `listClusters`

```ts
export async function* listClusters(
  ecs: AWS.ECS,
  params: AWS.ECS.ListClustersRequest
): AsyncIterable<string>
```

### `listContainerInstances`

```ts
export async function* listContainerInstances(
  ecs: AWS.ECS,
  params: AWS.ECS.ListContainerInstancesRequest
): AsyncIterable<string>
```

### `listServices`

```ts
export async function* listServices(
  ecs: AWS.ECS,
  params: AWS.ECS.ListServicesRequest
): AsyncIterable<string>
```

### `listTaskDefinitionFamilies`

```ts
export async function* listTaskDefinitionFamilies(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionFamiliesRequest
): AsyncIterable<string>
```

### `listTaskDefinitions`

```ts
export async function* listTaskDefinitions(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTaskDefinitionsRequest
): AsyncIterable<string>
```

### `listTasks`

```ts
export async function* listTasks(
  ecs: AWS.ECS,
  params: AWS.ECS.ListTasksRequest
): AsyncIterable<string>
```

## S3

```js
import { S3 } from '@jcoreio/aws-sdk-async-iterables'
```

### `listObjectsV2`

`listObjectsV2(s3: AWS.S3, params: AWS.S3.ListObjectsV2Request): AsyncIterable<AWS.S3.Object>`

Async iterable version of `AWS.S3.listObjectsV2`.

### `deleteObjects`

`deleteObjects(s3: AWS.S3, params: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Async iterable version of `AWS.S3.deletedObjects`. `params.Delete.Objects` can be an `Iterable<ObjectIdentifier>` or `AsyncIterable<ObjectIdentifier>` instead
of just `ObjectIdentifier[]`.

### `listAndDeleteObjects`

`listAndDeleteObjects(s3: AWS.S3, listParams: AWS.S3.ListObjectsV2Request, deleteParams?: DeleteObjectsRequest*): AsyncIterable<AWS.S3.DeletedObject | AWS.S3.Error>`

Convenience method for performing `deleteObjects` on all objects from `listObjectsV2`.
`deleteParams.Delete`, if given, must not have `Objects`.
