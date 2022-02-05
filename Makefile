# We have to specify a few additional special variables in order to support multi-line shell commands.
null :=
space := ${null} ${null}
${space} := ${space}# ${ } is a space. Neat huh?

define \n


endef

SUB_MAKEFILES_ROOT = ./devtools/makefiles

_DOCKER_COMPOSE_FILES=devtools/docker-compose-files

include $(SUB_MAKEFILES_ROOT)/Makefile.dev