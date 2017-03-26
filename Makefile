.PHONY: check,mocha-test,test,compile-js,build,move,install

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash
MOCHA_FILES := $(shell find ./test -name '*_test.js')
LIB := node_modules
FILELIST := bin config dao distributed doc errors interceptors lib routers servers services template tools staticFiles History.md index.js INSTALL.md LICENSE package.json README.md Makefile
PROJECRNAME = portal-server
TEMPDIR = /tmp
TEMPPROJECT := $(TEMPDIR)/$(PROJECRNAME)

# 轮询指令
all: check mocha-test

# 测试指令
test: mocha-test test-cov

# 构建指令
build: check move compile-js cleanCompile tarProject

# 检测代码是否符合标准
check: $(shell find . -name '*.js' ! -path './node_modules/*' ! -path './coverage/*' ! -path './mochawesome-reports/*' ! -path './staticFiles/*' ! -path './tools/webTools/*')
	@jshint $^

# mocha测试
mocha-test: $(MOCHA_FILES)
	@mocha $^ --reporter mochawesome

# 清除
clean: lib-cov
	@rm -rf test-cov

# 测试覆盖率
test-cov: $(MOCHA_FILES)
	@istanbul cover node_modules/.bin/_mocha $^ -R spec

# 安装
install:
	cnpm install --production

# 启动
start:
	nohup node index.js > log/portal.log 2>&1 &

# 移动文件
.ONESHELL:
move:
	rm -rf $(TEMPPROJECT)
	mkdir -p $(TEMPPROJECT)
	cp -R $(FILELIST) $(TEMPPROJECT)

# 编译js
compile-js:
	@babel staticFiles/js/portal/src -d $(TEMPPROJECT)/staticFiles/js/portal/bin
	@babel tools/webTools/lib/src -d $(TEMPPROJECT)/tools/webTools/lib/bin

cleanCompile:
	@rm -rf $(TEMPPROJECT)/staticFiles/js/portal/src
	@rm -rf $(TEMPPROJECT)/tools/webTools/lib/src

# 压缩项目jar包
tarProject:
	@tar -czvf $(PROJECRNAME).tar.gz $(TEMPPROJECT)
	@rm -rf $(TEMPPROJECT)
	@echo $(PROJECRNAME).tar.gz BUILD SUCCESS
