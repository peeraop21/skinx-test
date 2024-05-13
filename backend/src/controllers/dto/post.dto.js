"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostDtoResponse = exports.UpdatePostDtoResponse = exports.UpdatePostDtoRequest = exports.CreatePostsByJsonFileDtoResponse = exports.CreatePostsByJsonFileDtoRequest = exports.CreatePostDtoResponse = exports.CreatePostDtoRequest = exports.GetAllPostsDtoResponse = exports.GetPostDtoResponse = void 0;
const class_validator_1 = require("class-validator");
/// Get Post
class GetPostDtoResponse {
}
exports.GetPostDtoResponse = GetPostDtoResponse;
/// Get All Posts
class GetAllPostsDtoResponse {
}
exports.GetAllPostsDtoResponse = GetAllPostsDtoResponse;
/// Create Post
class CreatePostDtoRequest {
}
exports.CreatePostDtoRequest = CreatePostDtoRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDtoRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDtoRequest.prototype, "content", void 0);
class CreatePostDtoResponse {
}
exports.CreatePostDtoResponse = CreatePostDtoResponse;
/// Create Posts By Json File
class CreatePostsByJsonFileDtoRequest {
}
exports.CreatePostsByJsonFileDtoRequest = CreatePostsByJsonFileDtoRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostsByJsonFileDtoRequest.prototype, "base64String", void 0);
class CreatePostsByJsonFileDtoResponse {
}
exports.CreatePostsByJsonFileDtoResponse = CreatePostsByJsonFileDtoResponse;
/// Update Post
class UpdatePostDtoRequest {
}
exports.UpdatePostDtoRequest = UpdatePostDtoRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePostDtoRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePostDtoRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePostDtoRequest.prototype, "content", void 0);
class UpdatePostDtoResponse {
}
exports.UpdatePostDtoResponse = UpdatePostDtoResponse;
/// Delete Post
class DeletePostDtoResponse {
}
exports.DeletePostDtoResponse = DeletePostDtoResponse;
