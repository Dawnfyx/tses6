USE [cfineContract]
GO
/****** Object:  Table [dbo].[contract]    Script Date: 03/12/2019 10:08:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contract](
	[id] [int] NOT NULL,
	[company] [varchar](255) NULL,
	[perMain] [varchar](255) NULL,
	[tpyContract] [varchar](255) NULL,
	[numContract] [varchar](255) NULL,
	[namClient] [varchar](255) NULL,
	[namProject] [varchar](255) NULL,
	[monAll] [varchar](255) NULL,
	[monReceipt] [varchar](255) NULL,
	[monEnd] [varchar](255) NULL,
	[tpyReceipt] [varchar](255) NULL,
	[invStatus] [varchar](255) NULL,
	[invTime] [varchar](255) NULL,
	[monTransferMore] [varchar](255) NULL,
	[texContract] [varchar](255) NULL,
	[datExpiration] [varchar](255) NULL,
	[monExpiration] [varchar](255) NULL,
	[datRemain] [varchar](255) NULL,
	[tbeRemark] [varchar](255) NULL,
	[tbeStatus] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO


INSERT INTO [dbo].[contract]
VALUES
	('1', '楚非', '吴杰、丁敏', '学校', 'CF2018-0001', '上海市现代职业技术学校', '中式面点教学资源建设公开招标项目', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
	('2', '楚非', '李斌', '学校', 'CF2018-0001', '上海国际学校', '双语资源建设公开招标项目', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    ('3', '楚非', '连佑军', '学校', 'CF2018-0001', '上海信息技术学校', '计算机应用', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    ('4', '楚非', '连佑军', '学校', 'CF2018-0001', '上海信息技术学校', '计算机科学技术', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    ('5', '楚非', '连佑军', '学校', 'CF2018-0001', '上海信息技术学校', '软件工程', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
	('6', '楚非', '吴杰、丁敏', '学校', 'CF2018-0001', '上海枫叶国际学校', '一二三', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10521740）', '2023/1/3', '', '1');
