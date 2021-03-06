USE [UMSystem]
GO
/****** Object:  Table [dbo].[Membership_User]    Script Date: 03-02-2018 02:04:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Membership_User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Membership_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Membership_User] ON 

INSERT [dbo].[Membership_User] ([UserId], [Username], [Password], [IsActive]) VALUES (1, N'admin', N'admin@123', 1)
SET IDENTITY_INSERT [dbo].[Membership_User] OFF
/****** Object:  StoredProcedure [dbo].[sp_CheckLogin]    Script Date: 03-02-2018 02:05:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_CheckLogin] 
@Username varchar(50),
@Password varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT Userid,Username,IsActive from Membership_User where Username=@Username and Password=@Password and IsActive=1
END
GO
