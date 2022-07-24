# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.3] - 2022-07-24
### Changed
- Fix `BEHAVIOR` undefined variable

## [1.1.2] - 2022-07-24
### Changed
- Fix `ARCSHAPE` undefined variable

## [1.1.1] - 2022-07-23
### Changed
- Fix Documentation

## [1.1.0] - 2022-07-23
### Added
- Adding `offset` argument to the API, so it will add offset as circle arc before generates initial path.
- Add Typescript declaration file
### Changed
- Remove default `radius`, `widths` and `shapes` default arguments, instead if this parameter is empty it will throw `TypeError`

## [1.0.3] - 2021-12-17
### Changed
- Escape character '|' to distinguish between markdown table '|'.

## [1.0.2] - 2021-12-17
### Changed
- Revert v1.0.0, forgot to sign-in commit.

## [1.0.1] - 2021-12-17
- 

## [1.0.0] - 2021-12-17
### Changed
- PhotonSphere stable API
- Remove PhotonSphere 'fills' parameter and instead replace it using 'attributes' parameter which gives more options.