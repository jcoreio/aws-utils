import AWS from 'aws-sdk'

export async function* describeByoipCidrs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeByoipCidrsRequest
): AsyncIterable<AWS.EC2.ByoipCidr> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeByoipCidrs(params).promise()
    if (result.ByoipCidrs) yield* result.ByoipCidrs
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeCapacityReservations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeCapacityReservationsRequest
): AsyncIterable<AWS.EC2.CapacityReservation> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeCapacityReservations(params).promise()
    if (result.CapacityReservations) yield* result.CapacityReservations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClassicLinkInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClassicLinkInstancesRequest
): AsyncIterable<AWS.EC2.ClassicLinkInstance> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClassicLinkInstances(params).promise()
    if (result.Instances) yield* result.Instances
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClientVpnAuthorizationRules(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnAuthorizationRulesRequest
): AsyncIterable<AWS.EC2.AuthorizationRule> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClientVpnAuthorizationRules(params).promise()
    if (result.AuthorizationRules) yield* result.AuthorizationRules
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClientVpnConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnConnectionsRequest
): AsyncIterable<AWS.EC2.ClientVpnConnection> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClientVpnConnections(params).promise()
    if (result.Connections) yield* result.Connections
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClientVpnEndpoints(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnEndpointsRequest
): AsyncIterable<AWS.EC2.ClientVpnEndpoint> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClientVpnEndpoints(params).promise()
    if (result.ClientVpnEndpoints) yield* result.ClientVpnEndpoints
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClientVpnRoutes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnRoutesRequest
): AsyncIterable<AWS.EC2.ClientVpnRoute> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClientVpnRoutes(params).promise()
    if (result.Routes) yield* result.Routes
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeClientVpnTargetNetworks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeClientVpnTargetNetworksRequest
): AsyncIterable<AWS.EC2.TargetNetwork> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeClientVpnTargetNetworks(params).promise()
    if (result.ClientVpnTargetNetworks) yield* result.ClientVpnTargetNetworks
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeCoipPools(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeCoipPoolsRequest
): AsyncIterable<AWS.EC2.CoipPool> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeCoipPools(params).promise()
    if (result.CoipPools) yield* result.CoipPools
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeDhcpOptions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeDhcpOptionsRequest
): AsyncIterable<AWS.EC2.DhcpOptions> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeDhcpOptions(params).promise()
    if (result.DhcpOptions) yield* result.DhcpOptions
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeEgressOnlyInternetGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeEgressOnlyInternetGatewaysRequest
): AsyncIterable<AWS.EC2.EgressOnlyInternetGateway> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeEgressOnlyInternetGateways(params).promise()
    if (result.EgressOnlyInternetGateways)
      yield* result.EgressOnlyInternetGateways
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeElasticGpus(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeElasticGpusRequest
): AsyncIterable<AWS.EC2.ElasticGpus> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeElasticGpus(params).promise()
    if (result.ElasticGpuSet) yield* result.ElasticGpuSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeExportImageTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeExportImageTasksRequest
): AsyncIterable<AWS.EC2.ExportImageTask> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeExportImageTasks(params).promise()
    if (result.ExportImageTasks) yield* result.ExportImageTasks
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFastSnapshotRestores(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFastSnapshotRestoresRequest
): AsyncIterable<AWS.EC2.DescribeFastSnapshotRestoreSuccessItem> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFastSnapshotRestores(params).promise()
    if (result.FastSnapshotRestores) yield* result.FastSnapshotRestores
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFleetHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetHistoryRequest
): AsyncIterable<AWS.EC2.HistoryRecordEntry> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFleetHistory(params).promise()
    if (result.HistoryRecords) yield* result.HistoryRecords
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFleetInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetInstancesRequest
): AsyncIterable<AWS.EC2.ActiveInstance> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFleetInstances(params).promise()
    if (result.ActiveInstances) yield* result.ActiveInstances
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFleets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFleetsRequest
): AsyncIterable<AWS.EC2.FleetData> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFleets(params).promise()
    if (result.Fleets) yield* result.Fleets
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFlowLogs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFlowLogsRequest
): AsyncIterable<AWS.EC2.FlowLog> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFlowLogs(params).promise()
    if (result.FlowLogs) yield* result.FlowLogs
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeFpgaImages(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeFpgaImagesRequest
): AsyncIterable<AWS.EC2.FpgaImage> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeFpgaImages(params).promise()
    if (result.FpgaImages) yield* result.FpgaImages
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeHostReservationOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostReservationOfferingsRequest
): AsyncIterable<AWS.EC2.HostOffering> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeHostReservationOfferings(params).promise()
    if (result.OfferingSet) yield* result.OfferingSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeHostReservations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostReservationsRequest
): AsyncIterable<AWS.EC2.HostReservation> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeHostReservations(params).promise()
    if (result.HostReservationSet) yield* result.HostReservationSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeHosts(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeHostsRequest
): AsyncIterable<AWS.EC2.Host> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeHosts(params).promise()
    if (result.Hosts) yield* result.Hosts
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeIamInstanceProfileAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeIamInstanceProfileAssociationsRequest
): AsyncIterable<AWS.EC2.IamInstanceProfileAssociation> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeIamInstanceProfileAssociations(params).promise()
    if (result.IamInstanceProfileAssociations)
      yield* result.IamInstanceProfileAssociations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeImportImageTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeImportImageTasksRequest
): AsyncIterable<AWS.EC2.ImportImageTask> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeImportImageTasks(params).promise()
    if (result.ImportImageTasks) yield* result.ImportImageTasks
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeImportSnapshotTasks(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeImportSnapshotTasksRequest
): AsyncIterable<AWS.EC2.ImportSnapshotTask> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeImportSnapshotTasks(params).promise()
    if (result.ImportSnapshotTasks) yield* result.ImportSnapshotTasks
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeInstanceCreditSpecifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceCreditSpecificationsRequest
): AsyncIterable<AWS.EC2.InstanceCreditSpecification> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeInstanceCreditSpecifications(params).promise()
    if (result.InstanceCreditSpecifications)
      yield* result.InstanceCreditSpecifications
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstancesRequest
): AsyncIterable<AWS.EC2.Reservation> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeInstances(params).promise()
    if (result.Reservations) yield* result.Reservations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeInstanceTypeOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceTypeOfferingsRequest
): AsyncIterable<AWS.EC2.InstanceTypeOffering> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeInstanceTypeOfferings(params).promise()
    if (result.InstanceTypeOfferings) yield* result.InstanceTypeOfferings
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeInstanceTypes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInstanceTypesRequest
): AsyncIterable<AWS.EC2.InstanceTypeInfo> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeInstanceTypes(params).promise()
    if (result.InstanceTypes) yield* result.InstanceTypes
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeInternetGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeInternetGatewaysRequest
): AsyncIterable<AWS.EC2.InternetGateway> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeInternetGateways(params).promise()
    if (result.InternetGateways) yield* result.InternetGateways
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLaunchTemplates(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLaunchTemplatesRequest
): AsyncIterable<AWS.EC2.LaunchTemplate> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeLaunchTemplates(params).promise()
    if (result.LaunchTemplates) yield* result.LaunchTemplates
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLaunchTemplateVersions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLaunchTemplateVersionsRequest
): AsyncIterable<AWS.EC2.LaunchTemplateVersion> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeLaunchTemplateVersions(params).promise()
    if (result.LaunchTemplateVersions) yield* result.LaunchTemplateVersions
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGatewayRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTablesRequest
): AsyncIterable<AWS.EC2.LocalGatewayRouteTable> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeLocalGatewayRouteTables(params).promise()
    if (result.LocalGatewayRouteTables) yield* result.LocalGatewayRouteTables
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsRequest
): AsyncIterable<
  AWS.EC2.LocalGatewayRouteTableVirtualInterfaceGroupAssociation
> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations(params)
      .promise()
    if (result.LocalGatewayRouteTableVirtualInterfaceGroupAssociations)
      yield* result.LocalGatewayRouteTableVirtualInterfaceGroupAssociations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGatewayRouteTableVpcAssociations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayRouteTableVpcAssociationsRequest
): AsyncIterable<AWS.EC2.LocalGatewayRouteTableVpcAssociation> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeLocalGatewayRouteTableVpcAssociations(params)
      .promise()
    if (result.LocalGatewayRouteTableVpcAssociations)
      yield* result.LocalGatewayRouteTableVpcAssociations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewaysRequest
): AsyncIterable<AWS.EC2.LocalGateway> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeLocalGateways(params).promise()
    if (result.LocalGateways) yield* result.LocalGateways
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGatewayVirtualInterfaceGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayVirtualInterfaceGroupsRequest
): AsyncIterable<AWS.EC2.LocalGatewayVirtualInterfaceGroup> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeLocalGatewayVirtualInterfaceGroups(params)
      .promise()
    if (result.LocalGatewayVirtualInterfaceGroups)
      yield* result.LocalGatewayVirtualInterfaceGroups
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeLocalGatewayVirtualInterfaces(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeLocalGatewayVirtualInterfacesRequest
): AsyncIterable<AWS.EC2.LocalGatewayVirtualInterface> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeLocalGatewayVirtualInterfaces(params).promise()
    if (result.LocalGatewayVirtualInterfaces)
      yield* result.LocalGatewayVirtualInterfaces
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeNatGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNatGatewaysRequest
): AsyncIterable<AWS.EC2.NatGateway> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeNatGateways(params).promise()
    if (result.NatGateways) yield* result.NatGateways
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeNetworkAcls(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkAclsRequest
): AsyncIterable<AWS.EC2.NetworkAcl> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeNetworkAcls(params).promise()
    if (result.NetworkAcls) yield* result.NetworkAcls
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeNetworkInterfacePermissions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkInterfacePermissionsRequest
): AsyncIterable<AWS.EC2.NetworkInterfacePermission> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeNetworkInterfacePermissions(params).promise()
    if (result.NetworkInterfacePermissions)
      yield* result.NetworkInterfacePermissions
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeNetworkInterfaces(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeNetworkInterfacesRequest
): AsyncIterable<AWS.EC2.NetworkInterface> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeNetworkInterfaces(params).promise()
    if (result.NetworkInterfaces) yield* result.NetworkInterfaces
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describePrefixLists(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePrefixListsRequest
): AsyncIterable<AWS.EC2.PrefixList> {
  params = { ...params }
  let result
  do {
    result = await ec2.describePrefixLists(params).promise()
    if (result.PrefixLists) yield* result.PrefixLists
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describePrincipalIdFormat(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePrincipalIdFormatRequest
): AsyncIterable<AWS.EC2.PrincipalIdFormat> {
  params = { ...params }
  let result
  do {
    result = await ec2.describePrincipalIdFormat(params).promise()
    if (result.Principals) yield* result.Principals
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describePublicIpv4Pools(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribePublicIpv4PoolsRequest
): AsyncIterable<AWS.EC2.PublicIpv4Pool> {
  params = { ...params }
  let result
  do {
    result = await ec2.describePublicIpv4Pools(params).promise()
    if (result.PublicIpv4Pools) yield* result.PublicIpv4Pools
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeReservedInstancesModifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeReservedInstancesModificationsRequest
): AsyncIterable<AWS.EC2.ReservedInstancesModification> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeReservedInstancesModifications(params).promise()
    if (result.ReservedInstancesModifications)
      yield* result.ReservedInstancesModifications
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeReservedInstancesOfferings(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeReservedInstancesOfferingsRequest
): AsyncIterable<AWS.EC2.ReservedInstancesOffering> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeReservedInstancesOfferings(params).promise()
    if (result.ReservedInstancesOfferings)
      yield* result.ReservedInstancesOfferings
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeRouteTablesRequest
): AsyncIterable<AWS.EC2.RouteTable> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeRouteTables(params).promise()
    if (result.RouteTables) yield* result.RouteTables
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeScheduledInstanceAvailability(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeScheduledInstanceAvailabilityRequest
): AsyncIterable<AWS.EC2.ScheduledInstanceAvailability> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeScheduledInstanceAvailability(params).promise()
    if (result.ScheduledInstanceAvailabilitySet)
      yield* result.ScheduledInstanceAvailabilitySet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeScheduledInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeScheduledInstancesRequest
): AsyncIterable<AWS.EC2.ScheduledInstance> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeScheduledInstances(params).promise()
    if (result.ScheduledInstanceSet) yield* result.ScheduledInstanceSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSecurityGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSecurityGroupsRequest
): AsyncIterable<AWS.EC2.SecurityGroup> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSecurityGroups(params).promise()
    if (result.SecurityGroups) yield* result.SecurityGroups
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSnapshots(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSnapshotsRequest
): AsyncIterable<AWS.EC2.Snapshot> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSnapshots(params).promise()
    if (result.Snapshots) yield* result.Snapshots
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSpotFleetInstances(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetInstancesRequest
): AsyncIterable<AWS.EC2.ActiveInstance> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSpotFleetInstances(params).promise()
    if (result.ActiveInstances) yield* result.ActiveInstances
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSpotFleetRequestHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetRequestHistoryRequest
): AsyncIterable<AWS.EC2.HistoryRecord> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSpotFleetRequestHistory(params).promise()
    if (result.HistoryRecords) yield* result.HistoryRecords
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSpotFleetRequests(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotFleetRequestsRequest
): AsyncIterable<AWS.EC2.SpotFleetRequestConfig> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSpotFleetRequests(params).promise()
    if (result.SpotFleetRequestConfigs) yield* result.SpotFleetRequestConfigs
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSpotInstanceRequests(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotInstanceRequestsRequest
): AsyncIterable<AWS.EC2.SpotInstanceRequest> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSpotInstanceRequests(params).promise()
    if (result.SpotInstanceRequests) yield* result.SpotInstanceRequests
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSpotPriceHistory(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSpotPriceHistoryRequest
): AsyncIterable<AWS.EC2.SpotPrice> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSpotPriceHistory(params).promise()
    if (result.SpotPriceHistory) yield* result.SpotPriceHistory
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeStaleSecurityGroups(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeStaleSecurityGroupsRequest
): AsyncIterable<AWS.EC2.StaleSecurityGroup> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeStaleSecurityGroups(params).promise()
    if (result.StaleSecurityGroupSet) yield* result.StaleSecurityGroupSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeSubnets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeSubnetsRequest
): AsyncIterable<AWS.EC2.Subnet> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeSubnets(params).promise()
    if (result.Subnets) yield* result.Subnets
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTags(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTagsRequest
): AsyncIterable<AWS.EC2.Tag> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTags(params).promise()
    if (result.Tags) yield* result.Tags
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTrafficMirrorFilters(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorFiltersRequest
): AsyncIterable<AWS.EC2.TrafficMirrorFilter> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTrafficMirrorFilters(params).promise()
    if (result.TrafficMirrorFilters) yield* result.TrafficMirrorFilters
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTrafficMirrorSessions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorSessionsRequest
): AsyncIterable<AWS.EC2.TrafficMirrorSession> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTrafficMirrorSessions(params).promise()
    if (result.TrafficMirrorSessions) yield* result.TrafficMirrorSessions
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTrafficMirrorTargets(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTrafficMirrorTargetsRequest
): AsyncIterable<AWS.EC2.TrafficMirrorTarget> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTrafficMirrorTargets(params).promise()
    if (result.TrafficMirrorTargets) yield* result.TrafficMirrorTargets
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGatewayAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayAttachment> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTransitGatewayAttachments(params).promise()
    if (result.TransitGatewayAttachments)
      yield* result.TransitGatewayAttachments
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGatewayMulticastDomains(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayMulticastDomainsRequest
): AsyncIterable<AWS.EC2.TransitGatewayMulticastDomain> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTransitGatewayMulticastDomains(params).promise()
    if (result.TransitGatewayMulticastDomains)
      yield* result.TransitGatewayMulticastDomains
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGatewayPeeringAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayPeeringAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayPeeringAttachment> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeTransitGatewayPeeringAttachments(params)
      .promise()
    if (result.TransitGatewayPeeringAttachments)
      yield* result.TransitGatewayPeeringAttachments
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGatewayRouteTables(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayRouteTablesRequest
): AsyncIterable<AWS.EC2.TransitGatewayRouteTable> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTransitGatewayRouteTables(params).promise()
    if (result.TransitGatewayRouteTables)
      yield* result.TransitGatewayRouteTables
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGateways(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewaysRequest
): AsyncIterable<AWS.EC2.TransitGateway> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTransitGateways(params).promise()
    if (result.TransitGateways) yield* result.TransitGateways
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeTransitGatewayVpcAttachments(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeTransitGatewayVpcAttachmentsRequest
): AsyncIterable<AWS.EC2.TransitGatewayVpcAttachment> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeTransitGatewayVpcAttachments(params).promise()
    if (result.TransitGatewayVpcAttachments)
      yield* result.TransitGatewayVpcAttachments
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVolumes(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumesRequest
): AsyncIterable<AWS.EC2.Volume> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVolumes(params).promise()
    if (result.Volumes) yield* result.Volumes
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVolumesModifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumesModificationsRequest
): AsyncIterable<AWS.EC2.VolumeModification> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVolumesModifications(params).promise()
    if (result.VolumesModifications) yield* result.VolumesModifications
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVolumeStatus(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVolumeStatusRequest
): AsyncIterable<AWS.EC2.VolumeStatusItem> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVolumeStatus(params).promise()
    if (result.VolumeStatuses) yield* result.VolumeStatuses
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcClassicLinkDnsSupport(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcClassicLinkDnsSupportRequest
): AsyncIterable<AWS.EC2.ClassicLinkDnsSupport> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcClassicLinkDnsSupport(params).promise()
    if (result.Vpcs) yield* result.Vpcs
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpointConnectionNotifications(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointConnectionNotificationsRequest
): AsyncIterable<AWS.EC2.ConnectionNotification> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeVpcEndpointConnectionNotifications(params)
      .promise()
    if (result.ConnectionNotificationSet)
      yield* result.ConnectionNotificationSet
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpointConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointConnectionsRequest
): AsyncIterable<AWS.EC2.VpcEndpointConnection> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcEndpointConnections(params).promise()
    if (result.VpcEndpointConnections) yield* result.VpcEndpointConnections
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpoints(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointsRequest
): AsyncIterable<AWS.EC2.VpcEndpoint> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcEndpoints(params).promise()
    if (result.VpcEndpoints) yield* result.VpcEndpoints
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpointServiceConfigurations(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointServiceConfigurationsRequest
): AsyncIterable<AWS.EC2.ServiceConfiguration> {
  params = { ...params }
  let result
  do {
    result = await ec2
      .describeVpcEndpointServiceConfigurations(params)
      .promise()
    if (result.ServiceConfigurations) yield* result.ServiceConfigurations
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpointServicePermissions(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcEndpointServicePermissionsRequest
): AsyncIterable<AWS.EC2.AllowedPrincipal> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcEndpointServicePermissions(params).promise()
    if (result.AllowedPrincipals) yield* result.AllowedPrincipals
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcEndpointServices(
  ec2: AWS.EC2,

  params: AWS.EC2.DescribeVpcEndpointServicesRequest
): AsyncIterable<AWS.EC2.ServiceDetail> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcEndpointServices(params).promise()

    if (result.ServiceDetails) yield* result.ServiceDetails
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcPeeringConnections(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcPeeringConnectionsRequest
): AsyncIterable<AWS.EC2.VpcPeeringConnection> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcPeeringConnections(params).promise()
    if (result.VpcPeeringConnections) yield* result.VpcPeeringConnections
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}

export async function* describeVpcs(
  ec2: AWS.EC2,
  params: AWS.EC2.DescribeVpcsRequest
): AsyncIterable<AWS.EC2.Vpc> {
  params = { ...params }
  let result
  do {
    result = await ec2.describeVpcs(params).promise()
    if (result.Vpcs) yield* result.Vpcs
    if (result.NextToken) {
      params.NextToken = result.NextToken
    }
  } while (result.NextToken)
}
