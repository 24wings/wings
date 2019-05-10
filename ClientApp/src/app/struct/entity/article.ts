
/// <summary>
/// 创建文章
/// </summary>
export class Article {

    id?: number;
    /// <summary>
    /// 标题
    /// </summary>
    /// <value></value>
    title?: string
    /// <summary>
    /// html
    /// </summary>
    /// <value></value>
    html?
    /// <summary>
    /// markdown
    /// </summary>
    /// <value></value>
    markdown?
    /// <summary>
    /// 作者
    /// </summary>
    /// <value></value>
    author?
    /// <summary>
    /// 简介
    /// </summary>
    /// <value></value>
    summary
    /// <summary>
    /// 首版头像
    /// </summary>
    /// <value></value>
    bannerImageUrl
    /// <summary>
    /// 文章来源类型
    /// </summary>
    /// <value></value>

    /// <summary>
    /// 使用阅读量
    /// </summary>
    /// <value></value>
    useRead = false;
    /// <summary>
    /// 定制阅读量
    /// </summary>
    /// <value></value>
    useReadNum = 0;
    /// <summary>
    /// 使用正在阅读
    /// </summary>
    /// <value></value>
    useReading = false;
    /// <summary>
    /// 正在阅读数量
    /// </summary>
    /// <value></value>
    useReadingNum: number = 0;
    /// <summary>
    /// 阅读次数
    /// </summary>
    /// <value></value>
    readNum: number = 0;
    sourceType: number = 0;
    useAudio?: boolean = false;
    audioUrl?: string;
    audioName?: string = "";
    readingNum: number;

    useAddress?: boolean;
    address?: string;
    addressName?: string;
    lng
    lat
    contactPhone

}


