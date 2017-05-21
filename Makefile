CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 1.6.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

