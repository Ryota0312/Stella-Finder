// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.6.1
// source: server/proto/hoshiyomi/moon.proto

package moon

import (
	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MoonInfoRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Date      *timestamp.Timestamp `protobuf:"bytes,1,opt,name=date,proto3" json:"date,omitempty"`
	Latitude  float64              `protobuf:"fixed64,2,opt,name=latitude,proto3" json:"latitude,omitempty"`
	Longitude float64              `protobuf:"fixed64,3,opt,name=longitude,proto3" json:"longitude,omitempty"`
}

func (x *MoonInfoRequest) Reset() {
	*x = MoonInfoRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_server_proto_hoshiyomi_moon_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MoonInfoRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MoonInfoRequest) ProtoMessage() {}

func (x *MoonInfoRequest) ProtoReflect() protoreflect.Message {
	mi := &file_server_proto_hoshiyomi_moon_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MoonInfoRequest.ProtoReflect.Descriptor instead.
func (*MoonInfoRequest) Descriptor() ([]byte, []int) {
	return file_server_proto_hoshiyomi_moon_proto_rawDescGZIP(), []int{0}
}

func (x *MoonInfoRequest) GetDate() *timestamp.Timestamp {
	if x != nil {
		return x.Date
	}
	return nil
}

func (x *MoonInfoRequest) GetLatitude() float64 {
	if x != nil {
		return x.Latitude
	}
	return 0
}

func (x *MoonInfoRequest) GetLongitude() float64 {
	if x != nil {
		return x.Longitude
	}
	return 0
}

type MoonInfoResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	MoonRise *timestamp.Timestamp `protobuf:"bytes,1,opt,name=moonRise,proto3" json:"moonRise,omitempty"`
	MoonSet  *timestamp.Timestamp `protobuf:"bytes,2,opt,name=moonSet,proto3" json:"moonSet,omitempty"`
	MoonAge  float64              `protobuf:"fixed64,3,opt,name=moonAge,proto3" json:"moonAge,omitempty"`
}

func (x *MoonInfoResponse) Reset() {
	*x = MoonInfoResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_server_proto_hoshiyomi_moon_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MoonInfoResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MoonInfoResponse) ProtoMessage() {}

func (x *MoonInfoResponse) ProtoReflect() protoreflect.Message {
	mi := &file_server_proto_hoshiyomi_moon_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MoonInfoResponse.ProtoReflect.Descriptor instead.
func (*MoonInfoResponse) Descriptor() ([]byte, []int) {
	return file_server_proto_hoshiyomi_moon_proto_rawDescGZIP(), []int{1}
}

func (x *MoonInfoResponse) GetMoonRise() *timestamp.Timestamp {
	if x != nil {
		return x.MoonRise
	}
	return nil
}

func (x *MoonInfoResponse) GetMoonSet() *timestamp.Timestamp {
	if x != nil {
		return x.MoonSet
	}
	return nil
}

func (x *MoonInfoResponse) GetMoonAge() float64 {
	if x != nil {
		return x.MoonAge
	}
	return 0
}

var File_server_proto_hoshiyomi_moon_proto protoreflect.FileDescriptor

var file_server_proto_hoshiyomi_moon_proto_rawDesc = []byte{
	0x0a, 0x21, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x68,
	0x6f, 0x73, 0x68, 0x69, 0x79, 0x6f, 0x6d, 0x69, 0x2f, 0x6d, 0x6f, 0x6f, 0x6e, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x04, 0x6d, 0x6f, 0x6f, 0x6e, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x7b, 0x0a, 0x0f, 0x4d, 0x6f,
	0x6f, 0x6e, 0x49, 0x6e, 0x66, 0x6f, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2e, 0x0a,
	0x04, 0x64, 0x61, 0x74, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69,
	0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x04, 0x64, 0x61, 0x74, 0x65, 0x12, 0x1a, 0x0a,
	0x08, 0x6c, 0x61, 0x74, 0x69, 0x74, 0x75, 0x64, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x01, 0x52,
	0x08, 0x6c, 0x61, 0x74, 0x69, 0x74, 0x75, 0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6c, 0x6f, 0x6e,
	0x67, 0x69, 0x74, 0x75, 0x64, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x01, 0x52, 0x09, 0x6c, 0x6f,
	0x6e, 0x67, 0x69, 0x74, 0x75, 0x64, 0x65, 0x22, 0x9a, 0x01, 0x0a, 0x10, 0x4d, 0x6f, 0x6f, 0x6e,
	0x49, 0x6e, 0x66, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x36, 0x0a, 0x08,
	0x6d, 0x6f, 0x6f, 0x6e, 0x52, 0x69, 0x73, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a,
	0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x08, 0x6d, 0x6f, 0x6f, 0x6e,
	0x52, 0x69, 0x73, 0x65, 0x12, 0x34, 0x0a, 0x07, 0x6d, 0x6f, 0x6f, 0x6e, 0x53, 0x65, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x52, 0x07, 0x6d, 0x6f, 0x6f, 0x6e, 0x53, 0x65, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x6d, 0x6f,
	0x6f, 0x6e, 0x41, 0x67, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x01, 0x52, 0x07, 0x6d, 0x6f, 0x6f,
	0x6e, 0x41, 0x67, 0x65, 0x32, 0x44, 0x0a, 0x07, 0x4d, 0x6f, 0x6f, 0x6e, 0x41, 0x70, 0x69, 0x12,
	0x39, 0x0a, 0x08, 0x4d, 0x6f, 0x6f, 0x6e, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x15, 0x2e, 0x6d, 0x6f,
	0x6f, 0x6e, 0x2e, 0x4d, 0x6f, 0x6f, 0x6e, 0x49, 0x6e, 0x66, 0x6f, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x16, 0x2e, 0x6d, 0x6f, 0x6f, 0x6e, 0x2e, 0x4d, 0x6f, 0x6f, 0x6e, 0x49, 0x6e,
	0x66, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x25, 0x5a, 0x23, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x72, 0x79, 0x6f, 0x74, 0x61, 0x30, 0x33,
	0x31, 0x32, 0x2f, 0x68, 0x6f, 0x73, 0x68, 0x69, 0x79, 0x6f, 0x6d, 0x69, 0x2f, 0x6d, 0x6f, 0x6f,
	0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_server_proto_hoshiyomi_moon_proto_rawDescOnce sync.Once
	file_server_proto_hoshiyomi_moon_proto_rawDescData = file_server_proto_hoshiyomi_moon_proto_rawDesc
)

func file_server_proto_hoshiyomi_moon_proto_rawDescGZIP() []byte {
	file_server_proto_hoshiyomi_moon_proto_rawDescOnce.Do(func() {
		file_server_proto_hoshiyomi_moon_proto_rawDescData = protoimpl.X.CompressGZIP(file_server_proto_hoshiyomi_moon_proto_rawDescData)
	})
	return file_server_proto_hoshiyomi_moon_proto_rawDescData
}

var file_server_proto_hoshiyomi_moon_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_server_proto_hoshiyomi_moon_proto_goTypes = []interface{}{
	(*MoonInfoRequest)(nil),     // 0: moon.MoonInfoRequest
	(*MoonInfoResponse)(nil),    // 1: moon.MoonInfoResponse
	(*timestamp.Timestamp)(nil), // 2: google.protobuf.Timestamp
}
var file_server_proto_hoshiyomi_moon_proto_depIdxs = []int32{
	2, // 0: moon.MoonInfoRequest.date:type_name -> google.protobuf.Timestamp
	2, // 1: moon.MoonInfoResponse.moonRise:type_name -> google.protobuf.Timestamp
	2, // 2: moon.MoonInfoResponse.moonSet:type_name -> google.protobuf.Timestamp
	0, // 3: moon.MoonApi.MoonInfo:input_type -> moon.MoonInfoRequest
	1, // 4: moon.MoonApi.MoonInfo:output_type -> moon.MoonInfoResponse
	4, // [4:5] is the sub-list for method output_type
	3, // [3:4] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_server_proto_hoshiyomi_moon_proto_init() }
func file_server_proto_hoshiyomi_moon_proto_init() {
	if File_server_proto_hoshiyomi_moon_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_server_proto_hoshiyomi_moon_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MoonInfoRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_server_proto_hoshiyomi_moon_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MoonInfoResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_server_proto_hoshiyomi_moon_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_server_proto_hoshiyomi_moon_proto_goTypes,
		DependencyIndexes: file_server_proto_hoshiyomi_moon_proto_depIdxs,
		MessageInfos:      file_server_proto_hoshiyomi_moon_proto_msgTypes,
	}.Build()
	File_server_proto_hoshiyomi_moon_proto = out.File
	file_server_proto_hoshiyomi_moon_proto_rawDesc = nil
	file_server_proto_hoshiyomi_moon_proto_goTypes = nil
	file_server_proto_hoshiyomi_moon_proto_depIdxs = nil
}